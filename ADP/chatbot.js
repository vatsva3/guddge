// Guddge Chatbot Configuration and Script
const chatbotConfig = {
    title: "Guddge Assistant",
    subtitle: "Ask about our services",
    welcomeMessage: "Hi! I'm the Guddge Assistant. How can I help you today? You can ask about our services, case studies, or how we can help with your enterprise transformation.",
    primaryColor: "#2563eb"
};

// Chatbot responses
const chatbotResponses = {
    'services': `We organize our services around your challenges, not our capabilities:

1. **Legacy System Modernization** - Upgrade, consolidate, or replace aging systems without disrupting operations.

2. **Cloud Data Infrastructure** - Build modern data platforms on AWS. Migration, warehousing, and security.

3. **AI & Analytics Implementation** - Turn your data into insights with BI, ML, and analytics solutions.

Which area interests you most?`,
    
    'legacy': `Our Legacy System Modernization services include:

• SAP Migration & Upgrade (ECC to S/4HANA)
• System Consolidation (especially post-merger)
• Legacy Application Assessment
• Enterprise Architecture Design

We specialize in keeping operations running during transformations. Would you like to schedule a consultation?`,
    
    'cloud': `Our Cloud Data Infrastructure services include:

• AWS Cloud Migration
• Data Warehouse Modernization (Redshift, Snowflake)
• Data Platform Architecture
• Cloud Security & Compliance (HIPAA, SOC 2)

We have 40+ successful enterprise AWS migrations. What cloud challenge are you facing?`,
    
    'ai': `Our AI & Analytics services include:

• Business Intelligence Solutions (Power BI, Tableau)
• Data Analytics & Insights
• Machine Learning Implementation
• Data Governance & Quality

We help enterprises extract value from their data. What analytics goals do you have?`,
    
    'industries': `We work with enterprises across industries:

• Energy & Utilities (Sempra Energy)
• Healthcare (HIPAA-compliant cloud)
• Manufacturing (SAP upgrades)
• Financial Services (data warehouses)
• Retail (system consolidation)
• Technology (cloud platforms)

Our team has enterprise experience across all these sectors.`,
    
    'contact': `You can reach us:

• Email: info@guddge.com
• Phone: +1 (555) 123-4567
• Form: Fill out our contact form

We typically respond within 24 hours. Would you like me to help you fill out the contact form?`,
    
    'about': `Guddge is different because:

• Our team consists of former enterprise IT leaders (CIOs, CTOs)
• 20 years in business, 90+ projects completed
• Average client relationship: 12+ years
• We do long-term partnerships, not one-off projects

Our 12-year partnership with Sempra Energy is a great example of how we work.`,
    
    'sempra': `Sempra Energy has been our client for over 12 years. We:

• Modernized their core infrastructure
• Consolidated systems from multiple acquisitions
• Built a unified data platform
• Zero major disruptions throughout

This long-term partnership demonstrates our commitment to lasting relationships.`,
    
    'pricing': `We tailor our approach to each client's needs. Our engagement models include:

• Project-based fixed-price
• Time and materials
• Retainer partnerships

We'd need to understand your specific challenges to provide accurate pricing. Would you like to schedule a free consultation?`,
    
    'default': `Thanks for your question! Here are some things I can help with:

• Our services and approach
• Industries we work with
• Case studies and results
• How to get in touch

Or you can browse our website for more information. What would you like to know more about?`
};

// Initialize chatbot
function initChatbot() {
    // Add chatbot styles
    const styles = `
        .chatbot-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .chatbot-toggle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(37, 99, 235, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .chatbot-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 30px rgba(37, 99, 235, 0.5);
        }
        
        .chatbot-toggle svg {
            width: 28px;
            height: 28px;
            fill: white;
        }
        
        .chatbot-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 380px;
            height: 500px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 50px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            overflow: hidden;
            animation: chatbotSlideUp 0.3s ease-out;
        }
        
        @keyframes chatbotSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .chatbot-window.open { display: flex; }
        
        .chatbot-header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 1rem 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .chatbot-avatar {
            width: 40px;
            height: 40px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .chatbot-avatar svg {
            width: 24px;
            height: 24px;
            fill: white;
        }
        
        .chatbot-header-info h3 {
            font-size: 1rem;
            font-weight: 600;
            margin: 0;
        }
        
        .chatbot-header-info p {
            font-size: 0.8rem;
            opacity: 0.9;
            margin: 0;
        }
        
        .chatbot-close {
            margin-left: auto;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
        }
        
        .chatbot-close:hover { background: rgba(255,255,255,0.3); }
        
        .chatbot-messages {
            flex: 1;
            padding: 1rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .chatbot-message {
            max: 85%;
            padding: 0.75rem 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .chatbot-message.bot {
            background: #f1f5f9;
            color: #1a1a2e;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
        }
        
        .chatbot-message.user {
            background: #2563eb;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }
        
        .chatbot-input-area {
            padding: 1rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 0.5rem;
        }
        
        .chatbot-input-area input {
            flex: 1;
            padding: 0.75rem 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 24px;
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.3s;
        }
        
        .chatbot-input-area input:focus { border-color: #2563eb; }
        
        .chatbot-input-area button {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #2563eb;
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s;
        }
        
        .chatbot-input-area button:hover { background: #1d4ed8; }
        
        .chatbot-input-area button svg {
            width: 20px;
            height: 20px;
            fill: white;
        }
        
        .quick-replies {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            padding: 0 1rem 1rem;
        }
        
        .quick-reply {
            background: #e0e7ff;
            color: #2563eb;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.85rem;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .quick-reply:hover { background: #c7d2fe; }
        
        @media (max-width: 480px) {
            .chatbot-window { width: calc(100vw - 40px); right: -10px; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Add chatbot HTML
    const chatbotHTML = `
        <div class="chatbot-container">
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <div class="chatbot-avatar">
                        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    </div>
                    <div class="chatbot-header-info">
                        <h3>${chatbotConfig.title}</h3>
                        <p>${chatbotConfig.subtitle}</p>
                    </div>
                    <button class="chatbot-close" onclick="toggleChatbot()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="chatbot-message bot">${chatbotConfig.welcomeMessage}</div>
                </div>
                <div class="quick-replies" id="quickReplies">
                    <button class="quick-reply" onclick="sendQuickReply('Tell me about your services')">Services</button>
                    <button class="quick-reply" onclick="sendQuickReply('What industries do you work with?')">Industries</button>
                    <button class="quick-reply" onclick="sendQuickReply('How can I contact you?')">Contact</button>
                </div>
                <div class="chatbot-input-area">
                    <input type="text" id="chatbotInput" placeholder="Type your message..." onkeypress="handleKeyPress(event)">
                    <button onclick="sendMessage()">
                        <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </div>
            </div>
            <button class="chatbot-toggle" id="chatbotToggle" onclick="toggleChatbot()">
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>
            </button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

// Chatbot functions
function toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    window.classList.toggle('open');
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    setTimeout(() => {
        const response = getResponse(message);
        addMessage(response, 'bot');
    }, 500);
}

function sendQuickReply(text) {
    addMessage(text, 'user');
    
    setTimeout(() => {
        const response = getResponse(text);
        addMessage(response, 'bot');
    }, 500);
}

function addMessage(text, type) {
    const container = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}`;
    messageDiv.innerHTML = text.replace(/\\n/g, '<br>').replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
}

function getResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('service')) return chatbotResponses['services'];
    if (lowerMessage.includes('legacy') || lowerMessage.includes('moderniz') || lowerMessage.includes('sap') || lowerMessage.includes('upgrade')) return chatbotResponses['legacy'];
    if (lowerMessage.includes('cloud') || lowerMessage.includes('aws') || lowerMessage.includes('migrat')) return chatbotResponses['cloud'];
    if (lowerMessage.includes('ai') || lowerMessage.includes('analytics') || lowerMessage.includes('data') || lowerMessage.includes('ml') || lowerMessage.includes('machine learning')) return chatbotResponses['ai'];
    if (lowerMessage.includes('industries') || lowerMessage.includes('industry') || lowerMessage.includes('work with') || lowerMessage.includes('clients')) return chatbotResponses['industries'];
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('call')) return chatbotResponses['contact'];
    if (lowerMessage.includes('about') || lowerMessage.includes('who') || lowerMessage.includes('what is guddge')) return chatbotResponses['about'];
    if (lowerMessage.includes('sempra') || lowerMessage.includes('case study')) return chatbotResponses['sempra'];
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) return chatbotResponses['pricing'];
    
    return chatbotResponses['default'];
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
