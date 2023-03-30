import axios from "axios";
import config from "config";

export const apiClient = axios.create({
    baseURL: config.API_BASE,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export function getUser(userId) {
    return apiClient.get(`/users/${userId}`);
}

export function getProgress() {
    return apiClient.get(`/progress`);
}

export function getLessons() {
    return apiClient.get(`/lessons`);
}

export function getLesson(lessonId) {
    return apiClient.get(`/lessons/${lessonId}`);
}

export function getVocabs() {
    return apiClient.get(`/vocabularies`);
}

export function getVocab(lessonId, vocabIndex) {
    return apiClient.get(`/lessons/${lessonId}/vocabularies/${vocabIndex}`);
}

export function getConversations() {
    return apiClient.get(`/conversations`);
}

export function getConversation(lessonId, convoIndex) {
    return apiClient.get(`/lessons/${lessonId}/conversations/${convoIndex}`);
}

export function getWord(key) {
    return apiClient.get(`/words/${key}`);
}

export function getTrack(key) {
    return apiClient.get(`/tracks/${key.replace(/[^A-Za-z0-9]/g, '_')}`);
}

export function getAnimation(key) {
    return apiClient.get(`/animations/${key.replace(/[^A-Za-z0-9]/g, '_')}`);
}

export function getEmotion(key) {
    return apiClient.get(`/emotions/${key.replace(/[^A-Za-z0-9]/g, '_')}`);
}