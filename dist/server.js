"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Validate required configurations
        if (!config_1.default.db_url || !config_1.default.port) {
            console.error('Database URL or Port is missing in the configuration.');
            process.exit(1);
        }
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(config_1.default.db_url);
            console.log('Connected to MongoDB successfully');
            // Start the server
            app_1.default.listen(config_1.default.port, () => {
                console.log(`Server running on port ${config_1.default.port}`);
            });
        }
        catch (err) {
            console.error('Failed to connect to MongoDB:', err);
            process.exit(1); // Exit the process if database connection fails
        }
    });
}
// Handle shutdown gracefully
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Shutting down gracefully...');
    yield mongoose_1.default.disconnect();
    console.log('MongoDB disconnected');
    process.exit(0);
}));
// Initialize the application
main();
