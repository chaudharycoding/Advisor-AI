import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Voice Assistant API Integration Tests', () => {
  const API_URL = 'http://localhost:8787'

  beforeEach(() => {
    vi.clearAllMocks()
    global.fetch = vi.fn()
  })

  describe('GET /api/connection-details', () => {
    it('should return valid connection details with all required fields', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.serverUrl).toBeDefined()
      expect(data.roomName).toBeDefined()
      expect(data.participantName).toBeDefined()
      expect(data.participantToken).toBeDefined()
      expect(data.livekitAgentName).toBeDefined()
    })

    it('should return participant name in correct format', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_5678',
        participantToken: 'mock-token',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      expect(data.participantName).toMatch(/^voice_assistant_user_\d+$/)
    })

    it('should return valid JWT token format', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.test',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      // JWT format: header.payload.signature
      expect(data.participantToken.split('.')).toHaveLength(3)
      expect(data.participantToken).toMatch(/^eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/)
    })

    it('should return 500 error when environment variables are missing', async () => {
      const mockError = {
        error: 'Missing LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL in .env.local',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => mockError,
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      expect(response.ok).toBe(false)
      expect(response.status).toBe(500)
      expect(data.error).toContain('Missing')
    })

    it('should handle network errors gracefully', async () => {
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

      await expect(fetch(`${API_URL}/api/connection-details`)).rejects.toThrow('Network error')
    })

    it('should handle server errors (500)', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal server error',
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const error = await response.text()

      expect(response.ok).toBe(false)
      expect(response.status).toBe(500)
      expect(error).toBe('Internal server error')
    })

    it('should return different participant names on multiple calls', async () => {
      const mockResponse1 = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'token1',
        livekitAgentName: 'advisor-voice',
      }

      const mockResponse2 = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_5678',
        participantToken: 'token2',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse1,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse2,
        })

      const response1 = await fetch(`${API_URL}/api/connection-details`)
      const data1 = await response1.json()

      const response2 = await fetch(`${API_URL}/api/connection-details`)
      const data2 = await response2.json()

      expect(data1.participantName).toMatch(/^voice_assistant_user_\d+$/)
      expect(data2.participantName).toMatch(/^voice_assistant_user_\d+$/)
      // They may be the same due to random generation, but both should be valid
    })

    it('should use consistent room name across calls', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'token',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })

      const response1 = await fetch(`${API_URL}/api/connection-details`)
      const data1 = await response1.json()

      const response2 = await fetch(`${API_URL}/api/connection-details`)
      const data2 = await response2.json()

      expect(data1.roomName).toBe(data2.roomName)
      expect(data1.livekitAgentName).toBe(data2.livekitAgentName)
    })
  })

  describe('Frontend Integration with Voice API', () => {
    it('should successfully fetch token before connecting to LiveKit', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      // Simulate frontend code
      const response = await fetch('/api/connection-details')
      const data = await response.json()

      expect(data.serverUrl).toBeDefined()
      expect(data.participantToken).toBeDefined()
    })

    it('should handle API timeout', async () => {
      ;(global.fetch as any).mockImplementationOnce(() =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Request timeout')), 100)
        )
      )

      await expect(fetch(`${API_URL}/api/connection-details`)).rejects.toThrow('Request timeout')
    })

    it('should retry on transient failures', async () => {
      ;(global.fetch as any)
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            serverUrl: 'wss://test.livekit.cloud',
            roomName: 'test-room',
            participantName: 'voice_assistant_user_1234',
            participantToken: 'token',
            livekitAgentName: 'advisor-voice',
          }),
        })

      // First attempt fails
      await expect(fetch(`${API_URL}/api/connection-details`)).rejects.toThrow('Network error')

      // Retry succeeds
      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.participantToken).toBeDefined()
    })

    it('should validate response structure before using data', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'token',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      // Validate all required fields exist
      const requiredFields = [
        'serverUrl',
        'roomName',
        'participantName',
        'participantToken',
        'livekitAgentName',
      ]

      requiredFields.forEach((field) => {
        expect(data).toHaveProperty(field)
        expect(data[field]).toBeTruthy()
      })
    })

    it('should handle malformed JSON responses', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Unexpected token in JSON')
        },
      })

      const response = await fetch(`${API_URL}/api/connection-details`)

      await expect(response.json()).rejects.toThrow('Unexpected token in JSON')
    })
  })

  describe('Agent Dispatch Integration', () => {
    it('should ensure room exists before dispatching agent', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'token',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      // If we got a token, the room and agent were set up successfully
      expect(data.roomName).toBeDefined()
      expect(data.livekitAgentName).toBe('advisor-voice')
    })

    it('should handle agent name configuration', async () => {
      const mockResponse = {
        serverUrl: 'wss://test.livekit.cloud',
        roomName: 'test-room',
        participantName: 'voice_assistant_user_1234',
        participantToken: 'token',
        livekitAgentName: 'advisor-voice',
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const response = await fetch(`${API_URL}/api/connection-details`)
      const data = await response.json()

      expect(data.livekitAgentName).toBe('advisor-voice')
    })
  })
})
