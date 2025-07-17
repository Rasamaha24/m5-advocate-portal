# Backend Integration Guide for M5 Solutions

This guide explains how to connect backend services for authentication and Notion database integration for the M5 Solutions platform.

## Table of Contents

1. [Authentication Integration](#authentication-integration)
2. [Notion Database Integration](#notion-database-integration)
3. [Environment Setup](#environment-setup)
4. [Security Considerations](#security-considerations)
5. [Implementation Examples](#implementation-examples)

## Authentication Integration

### Recommended Authentication Providers

#### 1. **Auth0** (Recommended for Enterprise)
Auth0 provides enterprise-grade authentication with extensive customization options.

**Setup Steps:**
1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new application in your Auth0 dashboard
3. Configure allowed callback URLs
4. Install Auth0 React SDK: `npm install @auth0/auth0-react`

**Integration Code:**
```javascript
// src/auth/Auth0Provider.tsx
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
    >
      {children}
    </Auth0Provider>
  );
};
```

#### 2. **Supabase Auth** (Recommended for Rapid Development)
Supabase provides a complete backend solution with built-in authentication.

**Setup Steps:**
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Enable authentication providers in your Supabase dashboard
3. Install Supabase client: `npm install @supabase/supabase-js`

**Integration Code:**
```javascript
// src/auth/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Login function
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

// Sign up function
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}
```

#### 3. **Firebase Auth** (Google Integration)
Firebase provides easy integration with Google services and other providers.

**Setup Steps:**
1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable authentication methods in Firebase console
3. Install Firebase SDK: `npm install firebase`

**Integration Code:**
```javascript
// src/auth/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // ... other config
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
```

### Implementing Role-Based Access Control

For M5 Solutions, implement different user roles:

```javascript
// src/utils/roles.js
export const USER_ROLES = {
  ADMIN: 'admin',           // M5 Solutions administrators
  LOBBYIST: 'lobbyist',     // Lobbyist/advocacy firm staff
  CLIENT: 'client'          // End clients of lobbyists
};

export const hasPermission = (userRole, requiredRole) => {
  const roleHierarchy = {
    admin: 3,
    lobbyist: 2,
    client: 1
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};
```

## Notion Database Integration

### Overview
M5 Solutions embeds Notion databases to display Texas legislation, regulations, and session tracking for each client.

### Implementation Approaches

#### 1. **Notion API Integration** (Recommended)
Use Notion's official API to fetch and display database content.

**Setup Steps:**
1. Create a Notion integration at [notion.so/my-integrations](https://notion.so/my-integrations)
2. Share your databases with the integration
3. Install Notion SDK: `npm install @notionhq/client`

**Backend API Code (Node.js/Express):**
```javascript
// backend/routes/notion.js
const { Client } = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Fetch Texas bills for a specific client
app.get('/api/notion/texas-bills/:clientId', async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_TEXAS_BILLS_DB_ID,
      filter: {
        property: 'Client',
        select: {
          equals: clientId
        }
      },
      sorts: [
        {
          property: 'Last Updated',
          direction: 'descending'
        }
      ]
    });

    res.json(response.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Frontend Integration:**
```javascript
// src/components/NotionDatabase.tsx
import { useState, useEffect } from 'react';

const NotionDatabase = ({ clientId, databaseType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotionData = async () => {
      try {
        const response = await fetch(`/api/notion/${databaseType}/${clientId}`);
        const notionData = await response.json();
        setData(notionData);
      } catch (error) {
        console.error('Error fetching Notion data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotionData();
  }, [clientId, databaseType]);

  if (loading) return <div>Loading legislation data...</div>;

  return (
    <div className="notion-database">
      <h3>Texas Legislation Tracker</h3>
      {data.map((item) => (
        <div key={item.id} className="legislation-item">
          <h4>{item.properties.Title?.title[0]?.text?.content}</h4>
          <p>Status: {item.properties.Status?.select?.name}</p>
          <p>Last Updated: {item.properties['Last Updated']?.date?.start}</p>
        </div>
      ))}
    </div>
  );
};
```

#### 2. **Notion Embed Integration** (Alternative)
Embed Notion pages directly using iframes with authentication.

```javascript
// src/components/NotionEmbed.tsx
const NotionEmbed = ({ notionPageId, clientId }) => {
  const embedUrl = `https://notion.so/${notionPageId}?embed=true&client=${clientId}`;
  
  return (
    <iframe
      src={embedUrl}
      width="100%"
      height="600"
      frameBorder="0"
      title="Client Legislation Tracker"
      className="notion-embed"
    />
  );
};
```

### Database Structure Recommendations

#### Texas Bills Database Schema
```
Properties:
- Title (Title)
- Bill Number (Rich Text)
- Status (Select: Filed, In Committee, Passed House, Passed Senate, Signed, Vetoed)
- Client (Select: Client A, Client B, Client C...)
- Priority (Select: High, Medium, Low)
- Last Updated (Date)
- Summary (Rich Text)
- Next Action (Rich Text)
- Deadline (Date)
- Tags (Multi-select: Healthcare, Education, Business, etc.)
```

#### Regulations Database Schema
```
Properties:
- Title (Title)
- Agency (Select: TCEQ, Railroad Commission, etc.)
- Status (Select: Proposed, Comment Period, Final, Effective)
- Client (Select: Client A, Client B, Client C...)
- Effective Date (Date)
- Comment Deadline (Date)
- Last Updated (Date)
- Impact Assessment (Rich Text)
```

### Client Dashboard Implementation

```javascript
// src/pages/ClientDashboard.tsx
import { useAuth } from '@/hooks/useAuth';
import NotionDatabase from '@/components/NotionDatabase';

const ClientDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="client-dashboard">
      <h1>Welcome, {user.name}</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <NotionDatabase 
            clientId={user.clientId} 
            databaseType="texas-bills" 
          />
        </div>
        
        <div className="dashboard-section">
          <NotionDatabase 
            clientId={user.clientId} 
            databaseType="regulations" 
          />
        </div>
        
        <div className="dashboard-section">
          <NotionDatabase 
            clientId={user.clientId} 
            databaseType="sessions" 
          />
        </div>
      </div>
    </div>
  );
};
```

## Environment Setup

Create a `.env` file in your project root:

```bash
# Authentication (choose one)
REACT_APP_AUTH0_DOMAIN=your-auth0-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-auth0-client-id
REACT_APP_AUTH0_AUDIENCE=your-api-audience

# OR Supabase
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key

# OR Firebase
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id

# Notion Integration
NOTION_TOKEN=secret_your-notion-integration-token
NOTION_TEXAS_BILLS_DB_ID=your-texas-bills-database-id
NOTION_REGULATIONS_DB_ID=your-regulations-database-id
NOTION_SESSIONS_DB_ID=your-sessions-database-id

# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001
```

## Security Considerations

### 1. **Data Protection**
- Implement proper data encryption for sensitive legislative information
- Use HTTPS for all communications
- Implement proper session management
- Regular security audits of client data access

### 2. **Access Control**
- Implement proper role-based access control (RBAC)
- Ensure clients can only access their assigned data
- Log all data access for audit purposes
- Implement proper logout and session timeout

### 3. **Notion Security**
- Use Notion API with proper authentication
- Implement rate limiting for Notion API calls
- Cache frequently accessed data to reduce API calls
- Implement proper error handling for Notion API failures

### 4. **Compliance**
- Ensure GDPR/CCPA compliance for client data
- Implement proper data retention policies
- Provide data export capabilities for clients
- Regular backup of critical legislative data

## Implementation Examples

### Complete Login Flow
```javascript
// src/pages/Login.tsx (Updated)
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { signIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signIn(credentials.email, credentials.password);
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'lobbyist') {
        navigate('/lobbyist-dashboard');
      } else {
        navigate('/client-dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### Protected Route Implementation
```javascript
// src/components/ProtectedRoute.tsx
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (requiredRole && !hasPermission(user.role, requiredRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};
```

This comprehensive guide provides the foundation for implementing secure authentication and Notion database integration for the M5 Solutions platform. Choose the authentication provider that best fits your needs and follow the security best practices outlined above.
