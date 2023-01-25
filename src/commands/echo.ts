import { ButtonInteraction, ChatInputCommandInteraction, GuildMemberRoleManager, ModalSubmitInteraction, SlashCommandBuilder } from "discord.js";
import { echoButton } from "../components/ButtonComponents";
import { errorEmbed } from "../components/EmbedComponents";
import { inputModal } from "../components/ModalComponents";
import { roleId } from "../json/config.json";

export = {
    data: new SlashCommandBuilder()
        .setName("echo")
        .setDescription("Дублирует введённый текст"),
    async execute(interaction: ChatInputCommandInteraction) {
        if (!(interaction.member.roles instanceof GuildMemberRoleManager)) return await interaction.reply(errorEmbed("Команду можно использовать только на сервере"));
        try {
            await interaction.guild.roles.fetch(roleId);
        } catch {
            return await interaction.reply(errorEmbed("Роль которая даёт доступ к данной команде не найдена"));
        }
        if (!interaction.member.roles.cache.has(roleId)) return await interaction.reply(errorEmbed("У вас нет доступа к данной команде"));
        await interaction.reply({ components: [echoButton(true)], ephemeral: true });
        const prevInteraction = interaction;
        interaction.client.interactions.set("echoButton", async (interaction: ButtonInteraction) => {
            if (prevInteraction.user !== interaction.user) return await interaction.reply(errorEmbed("Вам не разрешено нажимать на эту кнопку"));
            await interaction.showModal(inputModal());
            interaction.client.interactions.set("inputModal", async (interaction: ModalSubmitInteraction) => {
                const text = interaction.fields.getTextInputValue("textInput");
                await interaction.channel.send({ content: text });
                if (interaction.isFromMessage()) return await interaction.update({ components: [echoButton(false)] });
            });
        });
    }
}