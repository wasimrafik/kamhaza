import React from 'react'

function ChatPage() {
  return (
    <>
      {/* <!-- Messages Page --> */}
      <div className="page hidden" id="messagesPage">
            <div className="container">
                <div className="messages-layout">
                    <div className="conversations-sidebar">
                        <div className="conversations-header">
                            <h2>Messages</h2>
                            <button className="btn-primary btn-sm" id="newMessageBtn">
                                <i className="fas fa-plus"></i> New
                            </button>
                        </div>
                        <div className="conversations-list" id="conversationsList"></div>
                    </div>
                    
                    <div className="chat-container">
                        <div className="chat-header">
                            <div className="chat-user-info">
                                <div className="user-avatar">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="user-details">
                                    <h3 id="chatUserName">Select a conversation</h3>
                                    <span className="user-status" id="chatUserStatus">Online</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="chat-messages" id="chatMessages">
                            <div className="no-conversation">
                                <i className="fas fa-comments"></i>
                                <p>Select a conversation to start messaging</p>
                            </div>
                        </div>
                        
                        <div className="chat-input hidden" id="chatInput">
                            <input type="text" placeholder="Type a message..." className="form-control" id="messageInput"/>
                            <button className="btn-primary" id="sendMessageBtn">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default ChatPage