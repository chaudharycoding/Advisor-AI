export const COURSE_DETAILS = {
  // Core Required Courses
  "CICS 110": {
    name: "Foundations of Programming",
    credits: 4,
    prerequisites: ["None"],
    description: "Introduction to computer programming and problem solving. Learn programming basics including variables, functions, loops, and object-oriented concepts. Covers how to break down problems into code, debug programs, and understand how computers execute programs. No programming experience required.",
    difficulty: "Beginner",
    offered: "Fall, Spring, Summer",
    category: "Core Required"
  },

  "CICS 160": {
    name: "Object-Oriented Programming",
    credits: 4,
    prerequisites: ["CICS 110 or COMPSCI 121 with a grade of C or better"],
    description: "Advanced programming focusing on object-oriented design and data structures. Learn classes, inheritance, polymorphism, and basic algorithms. Covers algorithm analysis, recursion, and program design principles. Requires prior programming experience with variables, loops, arrays, and functions.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Core Required"
  },

  "COMPSCI 198C": {
    name: "Intro to C",
    credits: 1,
    prerequisites: ["CICS 160"],
    description: "Introduction to programming concepts using C. Covers variables, control structures, functions, and basic data types.",
    difficulty: "Beginner",
    offered: "Fall, Spring, Summer",
    category: "Core Required"
  },

  "CICS 210": {
    name: "Data Structures",
    credits: 4,
    prerequisites: ["CICS 160 with a grade of C or better"],
    description: "Introduction to data structures and algorithm analysis. Learn to design and implement arrays, linked lists, stacks, queues, trees, hash tables, and graphs. Covers algorithm efficiency analysis using Big-O notation and performance comparison. Focus on practical implementation and testing of data structures.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Core Required"
  },

  "COMPSCI 220": {
    name: "Programming Methodology",
    credits: 4,
    prerequisites: ["CICS 210 with a grade of C or better"],
    description: "Advanced programming skills for large-scale software development. Learn design patterns, testing strategies, code refactoring, and library integration. Covers both functional and object-oriented programming approaches. Includes significant programming projects and exams.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Core Required"
  },

  "COMPSCI 230": {
    name: "Computer Systems Principles",
    credits: 4,
    prerequisites: ["CICS 210 with a grade of C or better and COMPSCI 198C"],
    description: "Study of computer systems architecture and low-level programming. Covers C programming, data representation, assembly language, memory management, and operating system concepts. Learn how computers work at the hardware and system level. Requires C programming experience.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Core Required"
  },
  
  "COMPSCI 240": {
    name: "Reasoning Under Uncertainty",
    credits: 4,
    prerequisites: ["CICS 160 or CICS 210 and MATH 132, all with a grade of C or better"],
    description: "Mathematical foundations for dealing with uncertainty and randomness. Covers probability theory, statistics, counting methods, random variables, and statistical inference. Learn Bayes' Law, Markov chains, and basic machine learning concepts. Essential for AI and data science.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Core Required"
  },

  "COMPSCI 250": {
    name: "Introduction to Computation",
    credits: 4,
    prerequisites: ["CICS 160 or CICS 210 and MATH 132, all with a grade of C or better"],
    description: "Mathematical foundations of computer science. Covers discrete mathematics, logic, set theory, formal languages, and automata theory. Learn about algorithms, recursion, graphs, and finite state machines. Essential theoretical background for advanced CS courses.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Core Required"
  },

  // Upper-Level Core Courses
  "COMPSCI 311": {
    name: "Introduction to Algorithms",
    credits: 4,
    prerequisites: ["CICS 210, and either COMPSCI 250 or MATH 455, all with a grade of C or better"],
    description: "Advanced algorithm design and analysis. Learn divide-and-conquer, greedy algorithms, dynamic programming, and network flow. Study algorithm efficiency using mathematical frameworks. Design efficient solutions and identify computationally hard problems. Includes programming assignments.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Upper-Level Core"
  },

  "CICS 305": {
    name: "Social Issues in Computing",
    credits: 3,
    prerequisites: ["ENGLISH WRITING 112 with a grade of C or better, COMPSCI 220, COMPSCI 230 and COMPSCI 240 (or 250)"],
    description: "Writing-intensive course exploring social impacts of computing technology. Learn technical communication for various audiences. Examine ethical issues, privacy, and societal effects of computers. Produces 20-25 pages of written work. CICS majors only.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Junior Year Writing"
  },

  "COMPSCI 320": {
    name: "Introduction to Software Engineering",
    credits: 4,
    prerequisites: ["COMPSCI 220 with a grade of C or better"],
    description: "Software engineering principles through team-based project development. Learn requirements analysis, software design, testing, and project management. Complete a semester-long team project covering the full software development lifecycle. Emphasizes teamwork, communication, and maintainable code.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Integrative Experience"
  },

  "COMPSCI 325": {
    name: "Introduction to Human Computer Interaction",
    credits: 3,
    prerequisites: ["CICS 210 with a grade of C or better"],
    description: "Design user-friendly computer interfaces using human-centered design principles. Learn design thinking, user research, prototyping, and usability testing. Hands-on project-based course covering interface design, human cognition, and evaluation methods. Open to juniors and seniors.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "COMPSCI 326": {
    name: "Web Programming",
    credits: 4,
    prerequisites: ["COMPSCI 220 (or COMPSCI 230) with a grade of C or better"],
    description: "Full-stack web development covering HTML5, CSS, JavaScript, and server-side technologies. Learn HTTP, databases, AJAX, and web security. Build a substantial dynamic web application through hands-on projects. JavaScript experience recommended.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Integrative Experience"
  },

  "CS 328": {
    name: "Mobile Health Sensing and Analytics",
    credits: 3,
    prerequisites: ["CICS 210"],
    description: "Mobile health sensing and analytics. Covers mobile health sensing, data analytics, and mobile health applications.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "CS 335": {
    name: "Inside the Box: How Computers Work	",
    credits: 3,
    prerequisites: ["CICS 220 or CICS 230"],
    description: "Inside the box: how computers work. Covers computer organization, assembly language, memory management, and system programming.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "CS 345": {
    name: "Practice and Applications of Data Management	",
    credits: 3,
    prerequisites: ["CICS 210"],
    description: "Practice and applications of data management. Covers data management principles, data analytics, and data applications.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Elective"
  },
  
  "COMPSCI 360": {
    name: "Introduction to Computer and Network Security",
    credits: 3,
    prerequisites: ["COMPSCI 230 with a grade of C or better"],
    description: "Introduction to cybersecurity fundamentals. Covers cryptography, network security, and privacy protection. Learn about encryption, authentication, security attacks, vulnerabilities, and defense strategies.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "COMPSCI 363": {
    name: "Computer Crime Law",
    credits: 3,
    prerequisites: ["COMPSCI 230 with a grade of C or better AND either ENGLISH WRITING 112 (with a grade of C or better) or the completion of the General Education requirement"],
    description: "Legal aspects of computer crimes and cybersecurity. Study laws governing digital evidence, privacy rights, surveillance, and cybercrime prosecution. Covers forensic investigation techniques and privacy protection technologies.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "COMPSCI 365": {
    name: "Digital Forensics",
    credits: 3,
    prerequisites: ["COMPSCI 230"],
    description: "Digital forensics for investigating computer crimes and security incidents. Learn to collect, analyze, and present digital evidence from computers, networks, and mobile devices. Covers file systems, operating systems, and legal aspects of digital evidence.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "COMPSCI 367": {
    name: "Reverse Engineering and Understanding Exploit Development",
    credits: 3,
    prerequisites: ["COMPSCI 230 with a grade of C or better, or permission of instructor"],
    description: "Learn reverse engineering and security vulnerability analysis. Study how attackers exploit software flaws and develop secure coding practices. Covers binary analysis, exploit development, and defensive programming techniques.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "COMPSCI 377": {
    name: "Operating Systems",
    credits: 4,
    prerequisites: ["COMPSCI 230 with a grade of C or better"],
    description: "Design and implementation of operating systems. Covers process management, memory management, file systems, and system security. Learn how operating systems manage hardware resources and provide services to applications.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "COMPSCI 383": {
    name: "Artificial Intelligence",
    credits: 3,
    prerequisites: ["CICS 210 and COMPSCI 240 (or STATISTICS 315), both with a grade of C or better"],
    description: "Introduction to modern AI technologies used in industry. Covers machine learning algorithms, neural networks, and practical AI applications. Emphasizes hands-on experience with current AI tools and techniques.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  "COMPSCI 389": {
    name: "Introduction to Machine Learning",
    credits: 3,
    prerequisites: ["a grade of C or better in CICS 210 and COMPSCI 240 (or STATISTICS 315 or STATISTICS 240 or PSYCHOLOGY 240 or OIM 240 or RESOURCE ECONOMICS 212 or SOCIOLOGY 212), and MATH 132"],
    description: "Introduction to machine learning for beginners. Covers supervised learning, reinforcement learning, and ethical considerations in AI. Learn how computers can improve performance through data and experience.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Elective"
  },

  // Advanced Electives
  "COMPSCI 403": {
    name: "Introduction to Robotics: Perception, Mechanics, Dynamics, and Control",
    credits: 3,
    prerequisites: ["MATH 235 and COMPSCI 220 (or COMPSCI 230) all with a grade of C or better"],
    description: "Introduction to robotics fundamentals. Learn robot kinematics, dynamics, control systems, and how robots interact with the physical world. Covers 3D movement, actuators, and feedback control using Python simulations.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 412": {
    name: "Quantum Information Science",
    credits: 3,
    prerequisites: ["MATH 132 and 235 and either COMPSCI 240 (or STATISTIC 315 or PHYSICS 281 or PHYSICS 287), all with a grade of C or better"],
    description: "Introduction to quantum computing and quantum information theory. Learn quantum algorithms, quantum cryptography, and how quantum computers can solve problems impossible for classical computers.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 420": {
    name: "Software Entrepreneurship",
    credits: 3,
    prerequisites: ["COMPSCI 320 (or COMPSCI 326) with a grade of C or better"],
    description: "Learn to develop software from concept to marketable product. Covers entrepreneurship principles, product development, and business strategies for software startups. Uses challenge-based learning with industry mentors.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 426": {
    name: "Scalable Web Systems",
    credits: 3,
    prerequisites: ["COMPSCI 320 or COMPSCI 326 with a grade of C or better"],
    description: "Advanced web application architecture and scalability. Learn to design and build large-scale web systems that handle millions of users. Covers distributed systems, load balancing, and performance optimization.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 429": {
    name: "Software Engineering Project Management",
    credits: 3,
    prerequisites: ["Enrollment in this course is only by permission of the instructor, and is restricted to students who have previously taken COMPSCI 320, and received a grade of B or better"],
    description: "Practical experience managing software development projects. Students serve as technical managers for COMPSCI 320 teams, learning project management, team leadership, and software development lifecycle management.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 445": {
    name: "Information Systems",
    credits: 3,
    prerequisites: ["COMPSCI 220 (or 230) and COMPSCI 311 and COMPSCI 345 with a grade of C or better"],
    description: "Large-scale data management and information systems. Covers database design, SQL, query optimization, and distributed data processing. Learn about relational databases, NoSQL systems, and big data technologies like MapReduce and Spark.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 446": {
    name: "Search Engines",
    credits: 3,
    prerequisites: ["COMPSCI 240 or COMPSCI 383 with a grade of C or better"],
    description: "This course provides an overview of the important issues in information retrieval, and how those issues affect the design and implementation of search engines. The course emphasizes the technology used in Web search engines, and the information retrieval theories and concepts that underlie all search applications.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 453": {
    name: "Computer Networks",
    credits: 3,
    prerequisites: ["Experience programming; COMPSCI 230 (or COMPSCI 377) with a grade of C or better"],
    description: "Introduction to computer networks and internet protocols. Covers TCP/IP, network programming, routing, wireless networks, and network security. Learn how data travels across the internet and how to build network applications.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 461": {
    name: "Secure Distributed Systems",
    credits: 3,
    prerequisites: ["COMPSCI 326, COMPSCI 345, COMPSCI 377, COMPSCI 453, or COMPSCI 497P with a grade of C or better"],
    description: "Security in distributed systems and blockchain technology. Learn consensus algorithms, Byzantine fault tolerance, and peer-to-peer network security. Covers cryptocurrency systems, distributed consensus, and network attack prevention.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  "COMPSCI 485": {
    name: "Applications of Natural Language Processing",
    credits: 3,
    prerequisites: ["COMPSCI 220 and COMPSCI 240 with a grade of C or better, or LINGUIST 429B (previously LINGUIST 492B) with a grade of C or better"],
    description: "Introduction to natural language processing applications. Learn text classification, sentiment analysis, machine translation, and language understanding. Hands-on projects with NLP tools and algorithms.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Advanced Elective"
  },

  // Additional CICS Courses from Fall 2025
  "CICS 127": {
    name: "Introduction to Public Interest Technology",
    credits: 4,
    prerequisites: ["None"],
    description: "Using technology to solve social problems responsibly. Learn how to apply information technology for community benefit and social good. Covers ethical considerations and practical strategies for technology in public service.",
    difficulty: "Beginner",
    offered: "Fall, Spring",
    category: "Elective"
  },
  "CICS 208": {
    name: "Defending Democracy in a Digital World",
    credits: 3,
    prerequisites: ["None"],
    description: "Examines the role of media and technology in democracy. Covers the evolution of public communication from print to digital media, and how technology affects democratic participation and civic engagement.",
    difficulty: "Beginner",
    offered: "Fall, Spring",
    category: "Elective"
  },
  "CICS 237": {
    name: "Introduction to Research in the Discipline",
    credits: 2,
    prerequisites: ["None"],
    description: "Introduction to computer science research through the Early Research Scholars Program. Provides group-based, mentored research experience for early-career CS and Informatics majors.",
    difficulty: "Beginner",
    offered: "Fall, Spring",
    category: "Research"
  },
  "CICS 256": {
    name: "Make: A Hands-on Introduction to Physical Computing",
    credits: 4,
    prerequisites: ["CICS 210"],
    description: "Hands-on introduction to physical computing and electronics. Learn Arduino programming, circuit design, sensors, and rapid prototyping including 3D printing. Build projects that interact with the physical world.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Elective"
  },
  "CICS 291C": {
    name: "Seminar - Finding your Strengths and Designing your Career",
    credits: 1,
    prerequisites: ["None"],
    description: "Career preparation for CICS students. Learn professional skills, resume writing, interview techniques, and career planning. Covers both technical and soft skills for internships and job searches.",
    difficulty: "Beginner",
    offered: "Fall, Spring",
    category: "Seminar"
  },
  "CICS 291T": {
    name: "Seminar - CICS Transfer Success",
    credits: 1,
    prerequisites: ["None"],
    description: "Support seminar for transfer students in CICS. Learn about campus resources, academic planning, and how to succeed in computer science at UMass. Led by instructors with transfer student experience.",
    difficulty: "Beginner",
    offered: "Fall, Spring",
    category: "Seminar"
  },
  "CICS 298A": {
    name: "Practicum - Leadership: Communicating Across Expertise",
    credits: 1,
    prerequisites: ["None"],
    description: "Learn to communicate technical concepts to diverse audiences. Develop leadership and teaching skills through tutoring and explaining complex ideas clearly. Prepares students for technical communication in professional settings.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Practicum"
  },

  // 500-Level Graduate Courses
  "COMPSCI 514": {
    name: "Algorithms for Data Science",
    credits: 3,
    prerequisites: ["COMPSCI 240 (or STATISTCS 315) and COMPSCI 311 both with a grade of B+ or better, or (COMPSCI 240 and STATISTCS 315 and COMPSCI 311 and MATH 233 and MATH 235, all with a C or better)"],
    description: "Mathematical foundations of big data processing. Learn algorithms for handling massive datasets, real-time data streams, and distributed computing. Covers sampling, sketching, and scalable statistical methods.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 515": {
    name: "Algorithms, Game Theory and Fairness",
    credits: 3,
    prerequisites: ["COMPSCI 240 and 250 with a grade of C or better in both"],
    description: "Algorithms for strategic decision-making and fair resource allocation. Covers game theory, matching algorithms, mechanism design, and fairness in algorithmic systems. Applications in healthcare, education, and security.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 520": {
    name: "Theory and Practice of Software Engineering",
    credits: 3,
    prerequisites: ["COMPSCI 320 (or COMPSCI 220 and COMPSCI 326) with a grade of C or better"],
    description: "Advanced software engineering techniques and modern practices. Covers AI-assisted development, automated testing, program verification, and software quality assurance. Learn software engineering for AI systems and industry best practices.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 532": {
    name: "Systems for Data Science",
    credits: 3,
    prerequisites: ["COMPSCI 377 and COMPSCI 445 both with a grade of C or better"],
    description: "Large-scale data systems and parallel computing. Learn distributed databases, performance optimization, and parallel processing. Covers scaling challenges, concurrency, and building systems for fast data analysis.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 550": {
    name: "Introduction to Simulation",
    credits: 3,
    prerequisites: ["CICS 210 and STATISTICS 315"],
    description: "Computer simulation for system design and analysis. Learn to model complex systems in healthcare, finance, telecommunications, and transportation. Covers stochastic systems, Monte Carlo methods, and simulation techniques.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 560": {
    name: "Introduction to Computer and Network Security",
    credits: 3,
    prerequisites: ["COMPSCI 453 with a grade of C or better"],
    description: "Graduate-level computer and network security. Hands-on approach to cryptography, network security, threat detection, and defense strategies. Learn to protect users, data, and services from attacks.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 563": {
    name: "Internet Law and Policy",
    credits: 3,
    prerequisites: ["either COMPSCI 311, 383, or 360 (previously 460) with a grade of C or better"],
    description: "Legal issues in computing and internet technology. Covers security law, privacy regulations, machine learning policy, and intellectual property. Learn legal research skills for staying current with technology law.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 565": {
    name: "Advanced Digital Forensic Systems",
    credits: 3,
    prerequisites: ["COMPSCI 365 or COMPSCI 377 with a grade of C or better"],
    description: "Advanced digital forensics techniques and systems. Covers file carving, filesystem analysis, network forensics, mobile device forensics, memory forensics, and anti-forensics techniques.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 575": {
    name: "Combinatorics and Graph Theory",
    credits: 3,
    prerequisites: ["either COMPSCI 250 or MATH 455 with a grade of B or better"],
    description: "Introduction to combinatorics and graph theory. Covers graph algorithms, counting methods, generating functions, and combinatorial structures. Topics include graph coloring, matching, and Euler/Hamiltonian circuits.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 578": {
    name: "Distributed Computing and Systems",
    credits: 3,
    prerequisites: ["COMPSCI 377 or an equivalent first course in operating systems"],
    description: "Principles of distributed systems and cloud computing. Covers distributed clocks, consensus algorithms, fault tolerance, and consistency. Learn cloud architectures, distributed programming, and cloud security.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 589": {
    name: "Machine Learning",
    credits: 3,
    prerequisites: ["MATH 545 and COMPSCI 240 and STATISTICS 315 all with a grade of C or better."],
    description: "Graduate-level machine learning covering classification, regression, clustering, and dimensionality reduction. Focus on practical application, model selection, and evaluation. Includes both theoretical and programming assignments.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 590AF": {
    name: "Reverse Engineering and Understanding Exploit Development",
    credits: 3,
    prerequisites: ["COMPSCI 230 with a grade of C or better"],
    description: "Graduate course in reverse engineering and security exploits. Learn attack patterns from real security incidents, binary exploitation techniques, and secure coding practices to prevent vulnerabilities.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 590Q": {
    name: "Quantum Information Systems",
    credits: 3,
    prerequisites: ["MATH 235 with a grade of C or better"],
    description: "Introduction to quantum computing and quantum information. Learn quantum algorithms (Grover's search, Shor's factorization), quantum entanglement, and teleportation. Mathematical foundations of quantum systems.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  // 600-Level Graduate Courses
  "COMPSCI 601": {
    name: "Computation Theory",
    credits: 3,
    prerequisites: ["an undergraduate course in automata theory and formal languages such as COMPSCI 501 or permission of instructor"],
    description: "Advanced theory of computation. Covers computability, complexity theory, and formal logic. Study what problems can be solved, how efficiently, and the mathematical foundations of computing.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Core"
  },

  "COMPSCI 602": {
    name: "Research Methods in Empirical Computer Science",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Research methodology for computer science. Learn to read papers, design experiments, analyze results, and write research reports. Covers research planning, hypothesis testing, and scientific communication.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Core"
  },

  "COMPSCI 611": {
    name: "Advanced Algorithms",
    credits: 3,
    prerequisites: ["The mathematical maturity expected of incoming Computer Science graduate students, knowledge of algorithms at the level of COMPSCI 311"],
    description: "Graduate-level algorithm design and analysis. Covers advanced topics including randomized algorithms, approximation algorithms, NP-completeness, and linear programming. Requires strong mathematical background.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Core"
  },

  "COMPSCI 635": {
    name: "Modern Computer Architecture",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Advanced computer architecture and hardware design. Study modern processor features including caches, pipelines, branch prediction, and parallelism. Explore recent research and performance optimization.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 646": {
    name: "Information Retrieval",
    credits: 3,
    prerequisites: ["Open to Masters and PhD Computer Science students only"],
    description: "Advanced information retrieval and search technology. Covers retrieval models, indexing, text representation, and evaluation methods. Learn to build large-scale search systems.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 648": {
    name: "Quantum Information Systems",
    credits: 3,
    prerequisites: ["Open to Masters and PhD Computer Science students only"],
    description: "Graduate quantum computing and information theory. Covers quantum circuits, algorithms, cryptography, and error correction. Topics include qubits, entanglement, and quantum complexity theory.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 660": {
    name: "Advanced Information Assurance",
    credits: 3,
    prerequisites: ["Open to Masters and PhD Computer Science students only"],
    description: "Research-focused information security course. Covers authentication, encryption, network security, malware analysis, privacy, and intrusion detection. Emphasis on latest security research and advanced topics.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 661": {
    name: "Secure Distributed Systems",
    credits: 3,
    prerequisites: ["Open to Masters and PhD Computer Science students and Electrical + Computer Engineering students"],
    description: "Graduate-level distributed systems security with focus on blockchain and cryptocurrencies. Covers consensus algorithms, Byzantine fault tolerance, and cryptographic protocols for distributed systems.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 666": {
    name: "Theory and Practice of Cryptography",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Graduate cryptography with emphasis on formal security proofs. Learn cryptographic algorithms, security definitions, and how to analyze cryptographic systems. Theoretical foundations applied to real-world systems.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 685": {
    name: "Advanced Natural Language Processing",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Graduate NLP focusing on deep learning and large language models. Covers neural language models, transformers, and cutting-edge NLP research. Requires machine learning background.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 687": {
    name: "Reinforcement Learning",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Graduate reinforcement learning covering Markov decision processes, value functions, policy gradients, and deep RL. Learn how agents learn through trial-and-error in robotics, games, and control applications.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 689": {
    name: "Machine Learning",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Graduate machine learning with strong statistical foundations. Covers supervised, unsupervised, and reinforcement learning. State-of-the-art methods including deep learning, graphical models, and Bayesian approaches.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  "COMPSCI 690F": {
    name: "Trustworthy and Responsible Artificial Intelligence",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "AI safety, security, and ethics. Learn to build trustworthy AI systems that mitigate privacy, security, and societal risks. Covers adversarial attacks, fairness, and limitations of modern AI models.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Elective"
  },

  // Graduate Seminars and Practicums
  "COMPSCI 692FT": {
    name: "Seminar - Fault Tolerant Quantum Computing",
    credits: 1,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Seminar on fault-tolerant quantum computing. Covers quantum error correction, scalable quantum architectures, and recent advances in quantum hardware.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Seminar"
  },

  "COMPSCI 692L": {
    name: "Seminar - Natural Language Processing",
    credits: 1,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Weekly NLP research seminar. Students read and discuss recent papers, with occasional invited speakers from academia and industry.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Seminar"
  },

  "COMPSCI 692PA": {
    name: "Seminar - AI Safety, Privacy, and Security",
    credits: 1,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Seminar on AI safety, privacy, and security research. Features leading researchers discussing how to make AI systems safe and secure for real-world applications.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Seminar"
  },

  "COMPSCI 692RP": {
    name: "Seminar - Robotics: Perception, Motion Planning, and Control",
    credits: 2,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Graduate robotics seminar covering robot vision, motion planning, navigation, and control. Students read, present, and discuss recent robotics research papers.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Seminar"
  },

  "COMPSCI 698W": {
    name: "Practicum - CS Research Writing Practicum",
    credits: 1,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Workshop for improving CS research writing skills. Focus on structure, clarity, and audience awareness. Process-based approach to technical writing.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Practicum"
  },

  // Master's Project Courses
  "COMPSCI 701": {
    name: "Advanced Topics in Computer Science",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Master's research project in computer science. Can be taken as 3 credits (second semester) or 6 credits (single semester). Advanced independent research with faculty supervision.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Master's Project"
  },

  "COMPSCI 701Y": {
    name: "Advanced Topics in Computer Science (1st Semester)",
    credits: 3,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "First semester of two-semester Master's research project. Students begin advanced research project, with final grade assigned after completing COMPSCI 701.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Master's Project"
  },

  // Teaching and Professional Development
  "COMPSCI 879": {
    name: "Teaching Assistants as Tomorrow's Faculty",
    credits: 2,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Preparation course for teaching assistants. Covers effective teaching methods, pedagogy, and classroom management. Required for all TAs before starting assistantship.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Professional Development"
  },

  "COMPSCI 891M": {
    name: "Seminar - Theory of Computation",
    credits: 1,
    prerequisites: ["Open to graduate Computer Science students only"],
    description: "Weekly theory seminar covering computation theory topics. Features research presentations by visitors and local faculty. May be repeated up to 6 times for credit.",
    difficulty: "Graduate",
    offered: "Fall, Spring",
    category: "Graduate Seminar"
  },

  // Honors Courses
  "COMPSCI H230": {
    name: "Honors Colloquium for Computer Systems Principles",
    credits: 1,
    prerequisites: ["Students must be enrolled in COMPSCI 230"],
    description: "Honors section exploring computer systems in greater depth. Covers low-level programming, memory management, and concurrency through additional reading and hands-on projects.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Honors"
  },

  "COMPSCI H250": {
    name: "Honors Colloquium for Introduction to Computation",
    credits: 1,
    prerequisites: ["Students must be enrolled in or have completed COMPSCI 250"],
    description: "Honors section with readings from 'Godel, Escher, Bach' by Hofstadter. Explores advanced topics in computation theory through mathematical problems and discussions.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Honors"
  },

  "COMPSCI H335": {
    name: "Honors Colloquium for Inside the Box: How Computers Work",
    credits: 1,
    prerequisites: ["Students must be enrolled in COMPSCI 335"],
    description: "Honors section with weekly meetings and independent projects. Students choose research projects or embedded systems applications, with regular progress reports and discussions.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Honors"
  },

  "COMPSCI H445": {
    name: "Honors Colloquium for Information Systems",
    credits: 1,
    prerequisites: ["Students must be enrolled in COMPSCI 445"],
    description: "Honors section covering advanced database and information systems topics. Students work on extended projects and participate in research discussions.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Honors"
  },

  "COMPSCI H446": {
    name: "Honors Colloquium for Search Engines",
    credits: 1,
    prerequisites: ["Students must be enrolled in COMPSCI 446"],
    description: "Honors section exploring social and ethical issues in search technology. Students research and present on search engine design, privacy, and information access.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Honors"
  },

  "COMPSCI H589": {
    name: "Honors Colloquium for Machine Learning",
    credits: 1,
    prerequisites: ["Students must be enrolled in or have completed COMPSCI 589"],
    description: "Honors section with advanced ML readings and discussions. Students read research papers, write responses, and lead group discussions on machine learning topics.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Honors"
  },

  // Required Math Courses
  "MATH 131": {
    name: "Calculus I",
    credits: 4,
    prerequisites: ["None"],
    description: "Introduction to calculus. Covers limits, derivatives, and continuity for various function types including trigonometric, logarithmic, and exponential functions.",
    difficulty: "Beginner",
    offered: "Fall, Spring",
    category: "Required Math"
  },
  "MATH 132": {
    name: "Calculus II",
    credits: 4,
    prerequisites: ["MATH 131"],
    description: "Continuation of calculus. Covers integration techniques, applications, sequences, series, and Taylor series. Essential for advanced CS courses.",
    difficulty: "Beginner",
    offered: "Fall, Spring",
    category: "Required Math"
  },
  "MATH 233": {
    name: "Multivariate Calculus",
    credits: 4,
    prerequisites: ["MATH 132"],
    description: "Calculus in multiple dimensions. Covers vectors, partial derivatives, multiple integrals, and vector calculus theorems. Required for advanced CS and ML courses.",
    difficulty: "Advanced",
    offered: "Fall, Spring",
    category: "Required Math"
  },
  "STAT 315": {
    name: "Statistics I",
    credits: 4,
    prerequisites: ["MATH 132"],
    description: "Probability and statistics fundamentals. Covers probability distributions, random variables, sampling, and statistical inference. Essential for machine learning and data science.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Required Math"
  },
  "MATH 235": {
    name: "Introduction to Linear Algebra",
    credits: 4,
    prerequisites: ["MATH 132"],
    description: "Introduction to linear algebra. Covers matrices, vector spaces, linear transformations, and eigenvalues. Essential for computer graphics, machine learning, and scientific computing.",
    difficulty: "Intermediate",
    offered: "Fall, Spring",
    category: "Required Math"
  },
};



export const getCourseInfo = (courseCode: string) => {
  return COURSE_DETAILS[courseCode as keyof typeof COURSE_DETAILS] || null;
};
