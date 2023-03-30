const env = process.env;

export default {
    API_BASE: env.REACT_APP_API_BASE || "http://localhost:8080",
    SIGN_RECOGNITION_ENDPOINT: env.REACT_APP_SIGN_RECOGNITION_ENDPOINT || "ws://localhost:8080/signRecognition"
}
