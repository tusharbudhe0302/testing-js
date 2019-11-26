module.exports.config = {
    PORT: process.env.appPort || 8082,
    Env: process.env.appEnv || 'dev',
    accessLogsPath: process.env.BlobStorageURL || './logs',
    mongoDbServer: process.env.MongoServerURL || 'localhost:27017',
    mongoDbName: process.env.MongoDb || 'mongoose_basics',
    inTestingPhase: process.env.isRequiredTest || true
}