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
const discord_js_1 = require("discord.js");
const ButtonComponents_1 = require("../components/ButtonComponents");
const EmbedComponents_1 = require("../components/EmbedComponents");
const ModalComponents_1 = require("../components/ModalComponents");
const config_json_1 = require("../json/config.json");
module.exports = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("echo")
        .setDescription("Дублирует введённый текст"),
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(interaction.member.roles instanceof discord_js_1.GuildMemberRoleManager))
                return yield interaction.reply((0, EmbedComponents_1.errorEmbed)("Команду можно использовать только на сервере"));
            try {
                yield interaction.guild.roles.fetch(config_json_1.roleId);
            }
            catch (_a) {
                return yield interaction.reply((0, EmbedComponents_1.errorEmbed)("Роль которая даёт доступ к данной команде не найдена"));
            }
            if (!interaction.member.roles.cache.has(config_json_1.roleId))
                return yield interaction.reply((0, EmbedComponents_1.errorEmbed)("У вас нет доступа к данной команде"));
            yield interaction.reply({ components: [(0, ButtonComponents_1.echoButton)(true)], ephemeral: true });
            const prevInteraction = interaction;
            interaction.client.interactions.set("echoButton", (interaction) => __awaiter(this, void 0, void 0, function* () {
                if (prevInteraction.user !== interaction.user)
                    return yield interaction.reply((0, EmbedComponents_1.errorEmbed)("Вам не разрешено нажимать на эту кнопку"));
                yield interaction.showModal((0, ModalComponents_1.inputModal)());
                interaction.client.interactions.set("inputModal", (interaction) => __awaiter(this, void 0, void 0, function* () {
                    const text = interaction.fields.getTextInputValue("textInput");
                    yield interaction.channel.send({ content: text });
                    if (interaction.isFromMessage())
                        return yield interaction.update({ components: [(0, ButtonComponents_1.echoButton)(false)] });
                }));
            }));
        });
    }
};
