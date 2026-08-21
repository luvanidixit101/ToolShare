import api from './api';

export interface AIChatRequest {
  message: string;
  conversationId?: string | null;
}

export interface AIChatResponse {
  message: string;
  conversationId?: string;
}

export const sendMessageToAI = async (
  request: AIChatRequest
): Promise<AIChatResponse> => {
  const response = await api.post<AIChatResponse>(
    '/ai/chat',
    request
  );

  return response.data;
};