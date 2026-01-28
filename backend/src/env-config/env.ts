function getEnv(key: string): string {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
}


export const env = {
    PORT: getEnv("PORT"),
    REACT_CLIENT_URL: getEnv("REACT_CLIENT_URL"),
    DB_NAME: getEnv("DB_NAME"),
    ACCESS_TOKEN_SECRET: getEnv("ACCESS_TOKEN_SECRET"),
    ACCESS_TOKEN_EXPIRY: getEnv("ACCESS_TOKEN_EXPIRY"),
    REFRESH_TOKEN_SECRET: getEnv("REFRESH_TOKEN_SECRET"),
    REFRESH_TOKEN_EXPIRY: getEnv("REFRESH_TOKEN_EXPIRY"),
    MONGODB_URI: getEnv("MONGODB_URI"),

} as const;