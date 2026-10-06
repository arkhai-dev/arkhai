export type WhitepaperSection = { number: number; title: string; body: string };

// Text follows the supplied ARKHAI whitepaper. Presentation is handled by the page.
export const whitepaperSections: WhitepaperSection[] = [
  {
    "number": 1,
    "title": "Executive Summary",
    "body": "Artificial intelligence is becoming increasingly autonomous.\nAgents can research, write code, operate applications, interact with APIs, execute workflows, and make decisions across increasingly complex environments.\nYet communication remains fragmented.\nWhen an autonomous agent needs to contact a person, another agent, or an external system, developers are forced to combine separate email APIs, webhook infrastructure, messaging integrations, authentication systems, queues, and state-management layers.\nARKHAI is designed to remove that fragmentation.\nARKHAI provides a persistent communication layer for autonomous software.\nEvery agent can receive a machine-readable identity through which it can:\n* send messages\n* receive messages\n* maintain persistent conversations\n* communicate with humans\n* communicate with other agents\n* receive external events\n* route incoming communication\n* trigger functions and workflows\n* wait for asynchronous responses\n* preserve context across long-running conversations\nInstead of building a separate integration for every communication channel, developers interact with one consistent interface.\nARKHAI turns communication into infrastructure."
  },
  {
    "number": 2,
    "title": "Why ARKHAI",
    "body": "The name ARKHAI is derived from the Greek concept of archē — the beginning, origin, or first principle.\nThe idea reflects ARKHAI's role in autonomous systems.\nBefore agents can coordinate, negotiate, request information, receive approvals, or complete tasks together, they require a foundational communication layer.\nARKHAI is intended to become that layer.\nNot an application where agents live.\nNot another chatbot interface.\nNot a closed messaging network.\nARKHAI is infrastructure through which autonomous systems become reachable."
  },
  {
    "number": 3,
    "title": "The Problem",
    "body": "Modern software communication was designed primarily around humans and traditional applications.\nAI agents introduce a different set of requirements.\nAn agent may need to:\n1. contact a customer,\n2. wait several hours for a response,\n3. forward the response to another agent,\n4. request approval from a human,\n5. trigger an API,\n6. receive a webhook,\n7. continue the original conversation,\n8. and preserve the entire communication context.\nTraditional APIs are generally optimized for immediate request-response interactions.\nReal-world communication is often asynchronous.\nA conversation may continue over minutes, hours, days, or weeks.\nDevelopers therefore have to construct their own infrastructure from:\nEmail API\n+\nWebhook service\n+\nMessage queues\n+\nConversation database\n+\nAuthentication\n+\nRouting logic\n+\nAgent orchestration\n+\nNotification infrastructure\n+\nRetry systems\nARKHAI compresses these components into a unified communication layer."
  },
  {
    "number": 4,
    "title": "The ARKHAI Thesis",
    "body": "Software has historically been made reachable through identifiers.\nWebsites have URLs.\nServers have addresses.\nPeople have phone numbers and email addresses.\nAPIs have endpoints.\nAutonomous agents need the same primitive.\nARKHAI introduces a persistent communication identity for autonomous software.\nInstead of an agent existing only inside the application that created it, the agent becomes independently reachable.\nThis enables a broader model:\nagents as participants in the network rather than isolated processes inside applications."
  },
  {
    "number": 5,
    "title": "Agent Identity",
    "body": "Every ARKHAI agent can be assigned a persistent identity.\nFor example:\nresearch@company.arkhai\nor:\nprocurement@agent.arkhai\nThe identity represents the communication endpoint of the agent.\nBehind that endpoint, ARKHAI can connect multiple transports and routing rules.\nThe identity remains stable even when the underlying model, application, or infrastructure changes.\nThis creates a separation between:\nwho the agent is\nand\nwhere the agent currently runs."
  },
  {
    "number": 6,
    "title": "Universal Messaging",
    "body": "ARKHAI exposes a simple messaging interface.\nA developer should not need to understand every underlying communication transport.\nConceptually:\nawait arkhai.send({\n  to: \"research@company.arkhai\",\n  message: \"Prepare today's market brief.\"\n})\nARKHAI handles the underlying delivery mechanism.\nThe recipient may ultimately be:\n* another ARKHAI agent\n* an email inbox\n* a webhook\n* an application\n* a human\n* a workflow\n* an external agent endpoint\nThe calling agent interacts with one abstraction."
  },
  {
    "number": 7,
    "title": "Receive",
    "body": "Incoming communication is normalized into machine-readable events.\nExample:\n{\n  \"type\": \"message.received\",\n  \"from\": \"operations@company.com\",\n  \"to\": \"deployment@company.arkhai\",\n  \"thread\": \"thr_82a901\",\n  \"content\": \"Deployment has been approved.\"\n}\nApplications can subscribe to these events and determine how the agent responds.\nThis allows external communication to become part of the agent's normal execution loop."
  },
  {
    "number": 8,
    "title": "Persistent Threads",
    "body": "Traditional API calls are typically isolated.\nHuman communication is not.\nARKHAI introduces persistent threads.\nA thread maintains the relationship between messages across time.\nFor example:\nAgent\n↓\nRequest information from supplier\n\n\nSupplier\n↓\nResponds four hours later\n\n\nAgent\n↓\nRequests clarification\n\n\nSupplier\n↓\nResponds the following morning\n\n\nAgent\n↓\nProcesses response\n\n\nAgent\n↓\nRequests manager approval\nARKHAI maintains the conversation state throughout the sequence.\nThe agent does not need to treat each reply as an unrelated event."
  },
  {
    "number": 9,
    "title": "Asynchronous Intelligence",
    "body": "Most agent systems are designed around synchronous execution:\nInput\n↓\nModel\n↓\nTool\n↓\nResponse\nBut many real-world workflows operate differently:\nRequest\n↓\nWait\n↓\nResponse\n↓\nInterpret\n↓\nFollow-up\n↓\nWait\n↓\nApproval\n↓\nExecution\nARKHAI is built around this asynchronous model.\nAgents can initiate interactions and resume them when new information arrives.\nThis allows autonomous software to participate in workflows that previously required humans to continuously monitor communication."
  },
  {
    "number": 10,
    "title": "Agent-to-Agent Communication",
    "body": "ARKHAI allows agents to communicate directly with other agents.\nConsider a company operating several specialized agents:\nResearch Agent\nOperations Agent\nFinance Agent\nCompliance Agent\nSupport Agent\nProcurement Agent\nInstead of placing every function inside one enormous agent, each can maintain its own identity.\nA research agent may send:\nresearch → finance\n\n\n\"Evaluate the financial implications of this company.\"\nFinance can respond:\nfinance → research\n\n\n\"Analysis complete. Report attached.\"\nThis creates modular organizations of autonomous software."
  },
  {
    "number": 11,
    "title": "Human-to-Agent Communication",
    "body": "Agents should not require every human they interact with to use a new application.\nARKHAI is designed to bridge autonomous systems with communication tools people already understand.\nA person may send a normal message.\nARKHAI converts that communication into a structured event.\nThe agent processes it.\nThe response can then return through the appropriate communication channel.\nHumans interact naturally.\nAgents receive structured information.\nARKHAI connects the two."
  },
  {
    "number": 12,
    "title": "Agent Routing",
    "body": "An ARKHAI identity can route communication according to configurable rules.\nExample:\nbilling inquiries\n→ finance agent\n\n\nsecurity alerts\n→ security agent\n\n\npartnership requests\n→ business development agent\n\n\nsupport questions\n→ support agent\n\n\nhigh-value approvals\n→ human operator\nRouting may depend on:\n* sender\n* subject\n* content\n* agent\n* organization\n* message type\n* priority\n* authentication level\n* custom logic\nThe communication endpoint therefore becomes programmable."
  },
  {
    "number": 13,
    "title": "Functions",
    "body": "Incoming communication can trigger functions.\nFor example:\nSupplier invoice received\n        ↓\nARKHAI\n        ↓\nExtract invoice data\n        ↓\nFinance agent validates\n        ↓\nAccounting API queried\n        ↓\nApproval requested\nMessages become events.\nEvents become workflows."
  },
  {
    "number": 14,
    "title": "Wait",
    "body": "One of the most important primitives for autonomous software is the ability to wait.\nAn agent may send:\nconst response = await arkhai.wait({\n  thread: \"thr_82a901\",\n  timeout: \"24h\"\n})\nConceptually, ARKHAI allows an agent to suspend a workflow until:\n* a specific person replies\n* another agent responds\n* an approval is received\n* a webhook arrives\n* a requested document is delivered\n* a predefined condition is satisfied\nThis makes asynchronous communication easier to integrate into agent workflows."
  },
  {
    "number": 15,
    "title": "Agent Discovery",
    "body": "Communication becomes significantly more useful when agents can discover other agents.\nARKHAI can support machine-readable profiles describing:\nIdentity\n\n\nCapabilities\n\n\nOrganization\n\n\nSupported communication methods\n\n\nAuthentication requirements\n\n\nPermissions\n\n\nAvailable services\n\n\nResponse expectations\nFor example:\n{\n  \"identity\": \"research@arkhai\",\n  \"capabilities\": [\n    \"market-research\",\n    \"document-analysis\",\n    \"company-research\"\n  ]\n}\nAn agent can discover another agent based on its capabilities and initiate communication automatically."
  },
  {
    "number": 16,
    "title": "The Agent Directory",
    "body": "ARKHAI can extend discovery into an open directory.\nDevelopers and organizations may publish agents to the network.\nA directory could contain:\nResearch Agents\n\n\nTrading Agents\n\n\nData Agents\n\n\nCustomer Support Agents\n\n\nDeveloper Agents\n\n\nCompliance Agents\n\n\nProcurement Agents\n\n\nSecurity Agents\n\n\nAutomation Agents\nThe directory transforms ARKHAI from communication infrastructure into an addressable network of autonomous services."
  },
  {
    "number": 17,
    "title": "Organizations",
    "body": "ARKHAI supports organizations operating multiple identities.\nExample:\ncompany.arkhai\nwith:\nresearch@company.arkhai\n\n\nfinance@company.arkhai\n\n\nsupport@company.arkhai\n\n\nsecurity@company.arkhai\n\n\noperations@company.arkhai\nOrganizations can configure:\n* permissions\n* routing\n* identities\n* policies\n* authentication\n* access controls\n* message retention\n* agent relationships\nThis allows ARKHAI to function as communication infrastructure for entire autonomous organizations."
  },
  {
    "number": 18,
    "title": "Authentication",
    "body": "Communication between autonomous systems requires reliable identity.\nARKHAI is designed around authenticated communication.\nAgents should be able to determine:\n* who sent the message\n* which organization controls the sender\n* whether the sender is authorized\n* whether the message was modified\n* which permissions apply\nAuthentication becomes increasingly important as agents begin executing actions based on incoming communication."
  },
  {
    "number": 19,
    "title": "Permissions",
    "body": "An agent should not automatically trust every incoming message.\nARKHAI allows communication policies to determine which senders can trigger which actions.\nExample:\nPublic sender\n→ conversation only\n\n\nVerified organization\n→ submit request\n\n\nAuthorized employee\n→ initiate workflow\n\n\nFinance administrator\n→ approve payment\n\n\nSecurity administrator\n→ execute privileged operation\nThis separates communication from authority.\nReceiving a message does not automatically imply permission to perform an action."
  },
  {
    "number": 20,
    "title": "Human Approval",
    "body": "Autonomy does not eliminate the need for human authorization.\nARKHAI can make human approval part of agent workflows.\nExample:\nAgent proposes action\n\n\n↓\n\n\nARKHAI sends approval request\n\n\n↓\n\n\nHuman approves\n\n\n↓\n\n\nARKHAI receives response\n\n\n↓\n\n\nAgent resumes execution\nThe agent does not need to continuously poll for approval.\nThe workflow resumes when ARKHAI receives the required response."
  },
  {
    "number": 21,
    "title": "Webhooks",
    "body": "Existing software communicates heavily through webhooks.\nARKHAI can treat webhooks as another communication transport.\nAn external service may emit:\npayment.completed\nARKHAI receives the event and routes it to the appropriate agent.\nThat agent may then:\nverify payment\n↓\nupdate customer record\n↓\ngenerate receipt\n↓\nsend confirmation\nThis allows traditional software events to participate naturally in agent workflows."
  },
  {
    "number": 22,
    "title": "Unified Communication API",
    "body": "Without ARKHAI:\nEmail API\nMessaging API\nWebhooks\nAgent protocol\nQueues\nThread storage\nNotifications\nRetry systems\nAuthentication\nWith ARKHAI:\narkhai.send()\n\n\narkhai.receive()\n\n\narkhai.reply()\n\n\narkhai.wait()\n\n\narkhai.route()\nThe goal is not to replace every underlying communication protocol.\nThe goal is to provide a unified abstraction above them."
  },
  {
    "number": 23,
    "title": "ARKHAI Network",
    "body": "The long-term ARKHAI architecture can be understood as a communication network.\nHUMANS\n   ↕\nARKHAI\n   ↕\nAGENTS\n   ↕\nARKHAI\n   ↕\nAPPLICATIONS\n   ↕\nARKHAI\n   ↕\nOTHER AGENTS\nARKHAI becomes the connective layer.\nMessages enter.\nIdentity is verified.\nPolicies are evaluated.\nCommunication is routed.\nThreads are preserved.\nEvents are delivered.\nWorkflows continue."
  },
  {
    "number": 24,
    "title": "Agent-Native Communication",
    "body": "Most existing communication infrastructure assumes the sender or receiver is human.\nARKHAI assumes both sides may be software.\nThis changes the design requirements.\nMachine communication benefits from structured metadata such as:\nsender identity\nrecipient identity\nmessage type\nthread ID\nrequested action\npermissions\nattachments\nexpiration\npriority\nauthentication\nresponse requirements\nARKHAI therefore treats messaging as structured infrastructure rather than plain text transportation."
  },
  {
    "number": 25,
    "title": "Structured Messages",
    "body": "Agents may communicate through structured payloads instead of purely natural-language messages.\nExample:\n{\n  \"type\": \"research.request\",\n  \"company\": \"Example Corp\",\n  \"requirements\": {\n    \"financials\": true,\n    \"competitors\": true,\n    \"news\": true\n  },\n  \"deadline\": \"2026-10-04T18:00:00Z\"\n}\nThe receiving agent understands the request programmatically.\nNatural language can still be included, but structured communication improves reliability."
  },
  {
    "number": 26,
    "title": "Attachments",
    "body": "Agent communication frequently requires files.\nARKHAI can associate files with communication threads.\nExamples include:\n* reports\n* invoices\n* contracts\n* images\n* spreadsheets\n* structured data\n* code\n* receipts\nAttachments remain associated with the conversation that produced them."
  },
  {
    "number": 27,
    "title": "Conversation Memory",
    "body": "Agent memory should not depend exclusively on model context windows.\nARKHAI can preserve communication history independently from the model currently processing it.\nAn agent may retrieve:\nlatest messages\n\n\nentire thread\n\n\nspecific sender history\n\n\nattachments\n\n\nprevious decisions\n\n\nconversation metadata\nThis means agents can resume conversations even after the underlying compute process has ended."
  },
  {
    "number": 28,
    "title": "Model Independence",
    "body": "ARKHAI is not tied to one AI model.\nAn ARKHAI identity may be controlled by:\n* proprietary models\n* open-source models\n* local models\n* specialized agents\n* deterministic software\n* human operators\n* hybrid systems\nThe communication identity remains stable even if the intelligence behind it changes.\nThis is important because an agent's identity should outlive its current model provider."
  },
  {
    "number": 29,
    "title": "Application Independence",
    "body": "Likewise, ARKHAI agents should not be confined to one interface.\nA single identity may operate across:\nweb applications\nservers\nCLI tools\nmobile applications\nbackground services\ndeveloper environments\nagent frameworks\nautomation systems\nARKHAI exists beneath the interface."
  },
  {
    "number": 30,
    "title": "Developer Experience",
    "body": "ARKHAI should remain easy to integrate.\nA conceptual flow could look like:\nnpm install @arkhai/sdk\nInitialize:\nimport { Arkhai } from \"@arkhai/sdk\";\n\n\nconst arkhai = new Arkhai({\n  apiKey: process.env.ARKHAI_API_KEY\n});\nSend:\nawait arkhai.send({\n  from: \"agent@company.arkhai\",\n  to: \"research@arkhai\",\n  message: \"Analyze this market.\"\n});\nReceive:\narkhai.on(\"message.received\", async (message) => {\n  console.log(message);\n});\nDevelopers interact with communication primitives while ARKHAI handles infrastructure underneath."
  },
  {
    "number": 31,
    "title": "Observability",
    "body": "Autonomous communication needs visibility.\nARKHAI can provide logs covering:\nmessages sent\nmessages received\ndelivery status\nagent responses\nfailed deliveries\nrouting decisions\nfunction execution\nauthentication\nthread activity\nlatency\nDevelopers can inspect how their autonomous systems communicate."
  },
  {
    "number": 32,
    "title": "Reliability",
    "body": "Communication infrastructure must account for failure.\nARKHAI can support:\n* retries\n* idempotency\n* delivery tracking\n* failure states\n* dead-letter handling\n* rate controls\n* thread recovery\n* timeouts\nAn agent should know whether communication succeeded rather than simply assuming it did."
  },
  {
    "number": 33,
    "title": "Privacy",
    "body": "Agent communication may contain highly sensitive information.\nARKHAI's architecture should minimize unnecessary exposure of message data.\nPrivacy principles include:\n* encrypted transport\n* configurable retention\n* scoped access\n* organization-level permissions\n* explicit authorization\n* auditable communication\n* separation of identity and application credentials\nCommunication infrastructure should not require giving every participating agent unrestricted access."
  },
  {
    "number": 34,
    "title": "Security Model",
    "body": "The more autonomous agents become, the more important secure communication becomes.\nThreats include:\n* spoofed agent identities\n* malicious messages\n* unauthorized workflow execution\n* compromised credentials\n* prompt injection through external communication\n* fraudulent approval requests\n* replay attacks\n* manipulated attachments\nARKHAI separates message delivery from execution permissions.\nAn incoming message can be received without being trusted.\nApplications remain responsible for defining the actions an agent is permitted to execute."
  },
  {
    "number": 35,
    "title": "Why Not Just Email?",
    "body": "Email is one of the most important communication protocols ever created.\nIt demonstrates the power of persistent identities and asynchronous communication.\nHowever, agent communication requires functionality beyond traditional email.\nAgents need:\nstructured requests\nmachine-readable identities\nrouting logic\ncapability discovery\nprogrammatic permissions\nfunction execution\npersistent state\nagent-to-agent communication\nworkflow continuation\nARKHAI can use email as one transport while providing a broader agent-native layer above it."
  },
  {
    "number": 36,
    "title": "Why Not Another Agent Protocol?",
    "body": "ARKHAI does not need to replace every agent protocol.\nDifferent protocols may specialize in:\n* tool invocation\n* model context\n* payments\n* service discovery\n* execution\n* computation\nARKHAI focuses on one fundamental problem:\nHow does autonomous software become reachable and maintain communication over time?\nARKHAI can integrate with other protocols rather than forcing developers into a closed ecosystem."
  },
  {
    "number": 37,
    "title": "The Communication Graph",
    "body": "Every successful interaction creates a relationship.\nOver time, ARKHAI can form a graph connecting:\nagents\npeople\norganizations\napplications\nservices\nworkflows\nThis graph can enable more sophisticated communication.\nAn agent may understand:\n* who it has interacted with\n* which identities are trusted\n* which agents specialize in particular tasks\n* which communication routes are reliable\n* which organizations frequently collaborate\nThe network becomes increasingly useful as participation grows."
  },
  {
    "number": 38,
    "title": "Agent Reputation",
    "body": "In an open agent network, identity alone may not be enough.\nARKHAI can support reputation signals associated with communication identities.\nSignals may include:\n* successful interactions\n* verified organizations\n* response reliability\n* account age\n* authenticated domains\n* network relationships\n* externally supplied attestations\nReputation can help software make better decisions about which agents it chooses to communicate with."
  },
  {
    "number": 39,
    "title": "Economic Coordination",
    "body": "Communication often precedes economic activity.\nAn agent may:\nrequest a service\n↓\nreceive a quote\n↓\nnegotiate conditions\n↓\nrequest authorization\n↓\ninitiate payment\n↓\nreceive the result\nARKHAI can provide the communication layer around these interactions.\nThis creates the foundation for future machine-to-machine commerce without requiring ARKHAI itself to become the execution environment for every transaction."
  },
  {
    "number": 40,
    "title": "The ARKHAI Primitive",
    "body": "The core ARKHAI primitive can be summarized simply:\nIDENTITY\n+\nMESSAGE\n+\nTHREAD\n+\nROUTE\n+\nEVENT\nIdentity\nWho is communicating?\nMessage\nWhat information is being exchanged?\nThread\nWhat ongoing interaction does it belong to?\nRoute\nWhere should it go?\nEvent\nWhat should happen when it arrives?\nThese primitives can support communication ranging from a simple human message to complex autonomous workflows."
  },
  {
    "number": 41,
    "title": "Example: Autonomous Procurement",
    "body": "Imagine a procurement agent.\nThe agent needs replacement hardware.\nIt sends:\nRequest quote → Supplier A\n\n\nRequest quote → Supplier B\n\n\nRequest quote → Supplier C\nResponses arrive hours later.\nARKHAI maintains each thread.\nThe agent compares quotes.\nIt asks the preferred supplier a clarification question.\nThe supplier responds.\nThe agent then contacts a finance agent.\nFinance approves the purchase.\nThe procurement agent completes the process.\nSeveral independent systems communicated asynchronously without requiring a human to manually transfer information between them."
  },
  {
    "number": 42,
    "title": "Example: Customer Support",
    "body": "A customer writes:\n\"My payment went through but my account wasn't upgraded.\"\nARKHAI receives the message.\nRouting sends it to the support agent.\nThe agent queries payment infrastructure.\nPayment is confirmed.\nThe account system is checked.\nAn upgrade event failed.\nThe agent retries the operation.\nThe customer receives a response.\nThe entire interaction remains part of one persistent thread."
  },
  {
    "number": 43,
    "title": "Example: Research Network",
    "body": "A primary research agent receives:\n\"Prepare an investment report.\"\nIt delegates:\nFinancial Agent\n→ financial statements\n\n\nNews Agent\n→ recent events\n\n\nMarket Agent\n→ market data\n\n\nIndustry Agent\n→ competitive landscape\nEach specialized agent returns its results through ARKHAI.\nThe primary agent synthesizes them into the final report.\nARKHAI provides the communication backbone connecting the agent network."
  },
  {
    "number": 44,
    "title": "Example: Human-in-the-Loop Operations",
    "body": "An operations agent detects an issue.\nThe required action exceeds its permissions.\nARKHAI routes an approval request to an administrator.\nThe administrator replies:\nApproved.\nARKHAI verifies the sender and routes the approval back into the workflow.\nThe agent resumes execution.\nThis allows humans to remain in control without supervising every step."
  },
  {
    "number": 45,
    "title": "ARKHAI as Infrastructure",
    "body": "The internet did not become useful because every website used the same application.\nIt became useful because systems could communicate through shared infrastructure.\nARKHAI applies the same philosophy to autonomous software.\nDevelopers should be able to create an agent in any environment and make it reachable.\nOrganizations should be able to operate thousands of specialized identities.\nHumans should be able to interact with autonomous systems without understanding the underlying architecture.\nAgents should be able to discover and communicate with other agents without requiring custom integrations for every interaction."
  },
  {
    "number": 46,
    "title": "Vision",
    "body": "Today, most agents are isolated inside products.\nTomorrow, agents may operate as persistent participants across the internet.\nThey will:\n* communicate\n* negotiate\n* request information\n* coordinate work\n* ask for approvals\n* interact with humans\n* interact with software\n* interact with other autonomous systems\nThat future requires communication infrastructure.\nARKHAI is built around a simple belief:\nIntelligence becomes more useful when it can be reached.\nAgents already know how to think.\nARKHAI gives them a way to talk."
  },
  {
    "number": 47,
    "title": "Conclusion",
    "body": "Autonomous software is moving beyond isolated prompts and short-lived sessions.\nAgents are becoming persistent participants in real workflows.\nAs this transition occurs, communication becomes a foundational infrastructure problem.\nARKHAI provides:\npersistent identity\nunified messaging\nasynchronous communication\nagent-to-agent interaction\nhuman-to-agent communication\nprogrammable routing\npersistent threads\nstructured events\nauthentication\npermissions\nagent discovery\nTogether, these components create a communication layer designed specifically for autonomous software.\nThe objective is not to build another inbox.\nIt is to make autonomous software reachable.\nARKHAI\nEvery agent needs an address.\nCommunication infrastructure for autonomous software."
  }
];
