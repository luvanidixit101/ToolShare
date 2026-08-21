import api from './api';

export interface AIChatRequest {
  message: string;
  conversationId: string | null;
}

export interface AIChatResponse {
  message: string;
  conversationId: string;
}

interface BackendAIResponse {
  message?: string;
  conversationId?: string;
}

export const sendMessageToAI = async (
  request: AIChatRequest
): Promise<AIChatResponse> => {
  try {
    const response = await api.post<BackendAIResponse>(
      '/ai/chat',
      {
        message: request.message,
        conversationId: request.conversationId,
      }
    );

    const data = response.data;

    return {
      message: data.message || 'No response received.',
      conversationId:
        data.conversationId || request.conversationId || '',
    };
  } catch (error: any) {
    console.error('AI Chat API Error:', error);

    throw new Error(
      error?.message || 'Failed to send message to AI'
    );
  }
};