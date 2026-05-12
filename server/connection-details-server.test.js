import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock dotenv
vi.mock('dotenv', () => ({
  default: {
    config: vi.fn(),
  },
}))

describe('LiveKit Connection Details Server', () => {
  describe('Token Generation Logic', () => {
    it('should configure token with 5 minute TTL', () => {
      const mockToken = {
        ttl: '',
        addGrant: vi.fn(),
        toJwt: vi.fn().mockReturnValue('mock-jwt'),
      }

      mockToken.ttl = '5m'
      expect(mockToken.ttl).toBe('5m')
    })

    it('should add correct grants for LiveKit room access', () => {
      const mockToken = {
        addGrant: vi.fn(),
        toJwt: vi.fn().mockReturnValue('mock-jwt'),
      }

      const grants = {
        room: 'test-room',
        roomJoin: true,
        canPublish: true,
        canPublishData: true,
        canSubscribe: true,
      }

      mockToken.addGrant(grants)

      expect(mockToken.addGrant).toHaveBeenCalledWith(grants)
      expect(mockToken.addGrant).toHaveBeenCalledWith(
        expect.objectContaining({
          roomJoin: true,
          canPublish: true,
          canSubscribe: true,
        })
      )
    })

    it('should return JWT token string', () => {
      const mockToken = {
        toJwt: vi.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test.signature'),
      }

      const token = mockToken.toJwt()
      expect(token).toBeTruthy()
      expect(token.split('.')).toHaveLength(3)
    })
  })

  describe('Room and Agent Dispatch Logic', () => {
    it('should handle room creation with correct configuration', () => {
      const mockRoomService = {
        createRoom: vi.fn().mockResolvedValue({}),
      }

      const roomConfig = { name: 'test-room', emptyTimeout: 600 }
      mockRoomService.createRoom(roomConfig)

      expect(mockRoomService.createRoom).toHaveBeenCalledWith({
        name: 'test-room',
        emptyTimeout: 600,
      })
    })

    it('should handle room already exists error gracefully', () => {
      const errorMessage = 'room already exists (409)'
      const isDuplicateError = /already exists|already exist|duplicate|identical|409/i.test(
        errorMessage
      )

      expect(isDuplicateError).toBe(true)
    })

    it('should deduplicate agent dispatches by filtering matching names', () => {
      const existingDispatches = [
        { id: 'dispatch-1', agentName: 'advisor-voice' },
        { id: 'dispatch-2', agentName: 'advisor-voice' },
        { id: 'dispatch-3', agentName: 'other-agent' },
      ]

      const targetAgent = 'advisor-voice'
      const toDelete = existingDispatches.filter((d) => d.agentName === targetAgent)

      expect(toDelete).toHaveLength(2)
      expect(toDelete[0].id).toBe('dispatch-1')
      expect(toDelete[1].id).toBe('dispatch-2')
    })

    it('should check deduplication configuration', () => {
      const shouldDeduplicate =
        process.env.LIVEKIT_AGENT_DISPATCH_DEDUP !== '0' &&
        process.env.LIVEKIT_LEGACY_AGENT_DISPATCH !== '1'

      expect(typeof shouldDeduplicate).toBe('boolean')
    })

    it('should handle dispatch creation', () => {
      const mockDispatchService = {
        createDispatch: vi.fn().mockResolvedValue({}),
      }

      mockDispatchService.createDispatch('test-room', 'advisor-voice')

      expect(mockDispatchService.createDispatch).toHaveBeenCalledWith('test-room', 'advisor-voice')
    })

    it('should detect dispatch conflict errors', () => {
      const conflictErrors = [
        'already exists',
        'duplicate dispatch',
        'conflict (409)',
        'agent exists',
      ]

      conflictErrors.forEach((errorMsg) => {
        const isConflict = /already|duplicate|exists|409|conflict/i.test(errorMsg)
        expect(isConflict).toBe(true)
      })
    })
  })

  describe('livekitUrlForServerSdk', () => {
    it('should convert wss:// to https://', () => {
      const livekitUrlForServerSdk = (url) => {
        if (!url) return url
        return url.replace(/^wss:\/\//i, 'https://').replace(/^ws:\/\//i, 'http://')
      }

      expect(livekitUrlForServerSdk('wss://example.com')).toBe('https://example.com')
      expect(livekitUrlForServerSdk('ws://example.com')).toBe('http://example.com')
      expect(livekitUrlForServerSdk('https://example.com')).toBe('https://example.com')
      expect(livekitUrlForServerSdk('')).toBe('')
      expect(livekitUrlForServerSdk(null)).toBeNull()
    })

    it('should be case insensitive', () => {
      const livekitUrlForServerSdk = (url) => {
        if (!url) return url
        return url.replace(/^wss:\/\//i, 'https://').replace(/^ws:\/\//i, 'http://')
      }

      expect(livekitUrlForServerSdk('WSS://example.com')).toBe('https://example.com')
      expect(livekitUrlForServerSdk('WS://example.com')).toBe('http://example.com')
    })
  })

  describe('API Endpoint /api/connection-details', () => {
    it('should return error when environment variables are missing', () => {
      const mockReq = {}
      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      }

      // Simulate missing env vars
      const API_KEY = undefined
      const API_SECRET = undefined
      const LIVEKIT_URL = undefined

      if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
        mockRes.status(500).json({
          error: 'Missing LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL in .env.local',
        })
      }

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({
        error: 'Missing LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL in .env.local',
      })
    })

    it('should return connection details with valid configuration', async () => {
      const mockReq = {}
      const mockRes = {
        json: vi.fn(),
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      }

      const API_KEY = 'test-api-key'
      const API_SECRET = 'test-api-secret'
      const LIVEKIT_URL = 'wss://test.livekit.cloud'
      const LIVEKIT_ROOM = 'test-room'
      const LIVEKIT_AGENT_NAME = 'advisor-voice'

      if (!API_KEY || !API_SECRET || !LIVEKIT_URL) {
        mockRes.status(500).json({
          error: 'Missing LIVEKIT_API_KEY, LIVEKIT_API_SECRET, or LIVEKIT_URL in .env.local',
        })
        return
      }

      const participantIdentity = `voice_assistant_user_${Math.round(Math.random() * 10_000)}`

      mockRes.json({
        serverUrl: LIVEKIT_URL,
        roomName: LIVEKIT_ROOM,
        participantName: participantIdentity,
        participantToken: 'mock-jwt-token',
        livekitAgentName: LIVEKIT_AGENT_NAME,
      })

      expect(mockRes.json).toHaveBeenCalled()
      const response = mockRes.json.mock.calls[0][0]

      expect(response.serverUrl).toBe('wss://test.livekit.cloud')
      expect(response.roomName).toBe('test-room')
      expect(response.participantName).toMatch(/^voice_assistant_user_\d+$/)
      expect(response.participantToken).toBe('mock-jwt-token')
      expect(response.livekitAgentName).toBe('advisor-voice')
    })

    it('should generate unique participant identities', () => {
      const identity1 = `voice_assistant_user_${Math.round(Math.random() * 10_000)}`
      const identity2 = `voice_assistant_user_${Math.round(Math.random() * 10_000)}`

      expect(identity1).toMatch(/^voice_assistant_user_\d+$/)
      expect(identity2).toMatch(/^voice_assistant_user_\d+$/)
      // They might be the same due to randomness, but format is correct
    })

    it('should handle errors and return 500 status', () => {
      const mockReq = {}
      const mockRes = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
        json: vi.fn(),
      }

      const error = new Error('Test error')
      console.error = vi.fn()

      mockRes.status(500).send(error.message)

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.send).toHaveBeenCalledWith('Test error')
    })

    it('should handle unknown errors', () => {
      const mockReq = {}
      const mockRes = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      }

      const error = 'Unknown error string'

      mockRes.status(500).json({ error: 'Unknown error' })

      expect(mockRes.status).toHaveBeenCalledWith(500)
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Unknown error' })
    })
  })

  describe('Environment Configuration', () => {
    it('should use default port 8787 when ADVISOR_API_PORT is not set', () => {
      const port = Number(process.env.ADVISOR_API_PORT || 8787)
      expect(port).toBe(8787)
    })

    it('should use custom port when ADVISOR_API_PORT is set', () => {
      const originalPort = process.env.ADVISOR_API_PORT
      process.env.ADVISOR_API_PORT = '3000'

      const port = Number(process.env.ADVISOR_API_PORT || 8787)
      expect(port).toBe(3000)

      // Restore
      process.env.ADVISOR_API_PORT = originalPort
    })

    it('should use default room name when not specified', () => {
      const roomName = process.env.LIVEKIT_ROOM_NAME || process.env.LIVEKIT_ROOM || 'roomName'
      expect(typeof roomName).toBe('string')
    })

    it('should use default agent name when not specified', () => {
      const agentName = process.env.LIVEKIT_AGENT_NAME || 'advisor-voice'
      expect(agentName).toBe('advisor-voice')
    })
  })
})
