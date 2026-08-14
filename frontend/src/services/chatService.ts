import api, { getStoredUser } from './api';
import { mockGetConversations, mockGetMessages } from './mockData';
import { mapConversation, mapMessage, unwrapData } from './mappers';
import type { Conversation, ChatMessage } from '@/types';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export async function getConversations(): Promise<Conversation[]> {
  if (USE_MOCK) return mockGetConversations();
  const { data } = await api.get('/chat/conversations');
  const body = unwrapData<Record<string, unknown>[]>(data);
  return (Array.isArray(body) ? body : []).map(mapConversation);
}

export async function getMessages(conversationId: string): Promise<ChatMessage[]> {
  if (USE_MOCK) return mockGetMessages(conversationId);
  const { data } = await api.get(`/chat/conversations/${conversationId}/messages`);
  const body = unwrapData<Record<string, unknown>[]>(data);
  const currentUserId = getStoredUser()?.id;
  return (Array.isArray(body) ? body : []).map((m) => mapMessage(m, currentUserId));
}

export interface SendMessagePayload {
  conversationId: string;
  text: string;
}

export async function sendMessage(payload: SendMessagePayload): Promise<ChatMessage> {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    return {
      id: 'm-' + Date.now(),
      conversationId: payload.conversationId,
      senderId: 'u1',
      text: payload.text,
      sentAt: new Date().toISOString(),
      mine: true,
    };
  }
  const { data } = await api.post('/chat/messages', payload);
  const currentUserId = getStoredUser()?.id;
  return mapMessage(unwrapData<Record<string, unknown>>(data), currentUserId);
}

export default { getConversations, getMessages, sendMessage };
