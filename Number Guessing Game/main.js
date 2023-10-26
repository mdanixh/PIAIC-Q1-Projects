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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var inquirer_1 = require("inquirer");
var maxAttemptsPerLevel = 10; // Maximum attempts per level
var level = 1; // Initialize the level
function guessNumberGame() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function () {
                        var hello, attempts, maxNumber, sysGeneratedNumber, answers, answer, playAgain;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    hello = chalk_1.default.bgGreenBright("Welcome to Level ".concat(level, " of the Number Guessing Game!"));
                                    console.log(hello);
                                    attempts = 0;
                                    maxNumber = level === 1 ? 10 : 20;
                                    _b.label = 1;
                                case 1:
                                    if (!(attempts < maxAttemptsPerLevel)) return [3 /*break*/, 3];
                                    console.log(chalk_1.default.yellowBright("Level ".concat(level)));
                                    sysGeneratedNumber = Math.floor(Math.random() * (maxNumber));
                                    return [4 /*yield*/, inquirer_1.default.prompt([
                                            {
                                                message: "Enter your guess (between 0 and ".concat(maxNumber, ")\nAttempt ").concat(attempts + 1, "/").concat(maxAttemptsPerLevel, ":"),
                                                type: "number",
                                                name: "guessNumber",
                                                validate: function (input) {
                                                    if (input < 0 || input > maxNumber) {
                                                        return "Please enter a number between 0 and ".concat(maxNumber, ".");
                                                    }
                                                    return true;
                                                },
                                            },
                                        ])];
                                case 2:
                                    answers = _b.sent();
                                    answer = answers.guessNumber;
                                    if (answer === sysGeneratedNumber) {
                                        console.log(chalk_1.default.bgYellow("Congratulations! You guessed the correct number in ".concat(attempts + 1, " attempts.")));
                                        if (level === 1) {
                                            if (attempts < maxAttemptsPerLevel - 1) {
                                                level++; // Move to the next level only if not at the 10th attempt
                                                console.log(chalk_1.default.redBright("You have advanced to Level ".concat(level, "!")));
                                            }
                                            else {
                                                console.log(chalk_1.default.red("You have completed Level 1, but you are out of attempts."));
                                                return [3 /*break*/, 3];
                                            }
                                        }
                                        else {
                                            console.log(chalk_1.default.blueBright("You have completed Level ".concat(level, "!")));
                                            return [2 /*return*/, { value: void 0 }];
                                        }
                                    }
                                    else {
                                        console.log(chalk_1.default.yellow('Sorry, try again.'));
                                        attempts++;
                                    }
                                    return [3 /*break*/, 1];
                                case 3:
                                    if (!(attempts === maxAttemptsPerLevel)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, inquirer_1.default.prompt([
                                            {
                                                message: "You've run out of attempts. Do you want to play again?",
                                                type: "confirm",
                                                name: "playAgain",
                                            },
                                        ])];
                                case 4:
                                    playAgain = _b.sent();
                                    if (playAgain.playAgain) {
                                        level = 1; // Reset the level
                                        console.log(chalk_1.default.blue("Starting a new game."));
                                    }
                                    else {
                                        console.log(chalk_1.default.red("Thank you for playing. Goodbye!"));
                                        return [2 /*return*/, { value: void 0 }];
                                    }
                                    _b.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _a.label = 1;
                case 1:
                    if (!(level <= 2)) return [3 /*break*/, 3];
                    return [5 /*yield**/, _loop_1()];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2 /*return*/, state_1.value];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    });
}
guessNumberGame();
