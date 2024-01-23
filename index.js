const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});
const config = require("./config.json");

client.once("ready", () => {
    console.log(`Sstudios bot © SstudiosDev - Connected as ${client.user.tag}`);

    const activities = [
        `New SstudiosDev`,
        `Mostly sleepless🌛`,
        `Welcome new player`,
    ];

    setInterval(() => {
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];

        client.user.setPresence({
            activities: [
                {
                    name: randomActivity,
                    type: 4,
                },
            ],
            status: "online",
        });
    }, 5000);
});

client.on("guildMemberAdd", async (member) => {
    // ID of the channel where the welcome message will be sent
    const welcomeChannelId = "1193826509140529182"; // Replace with the ID of your welcome channel

    // Find the channel by its ID
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);

    // Check if the channel was found
    if (welcomeChannel) {
        // Send a welcome message
        welcomeChannel.send(`Welcome to the server, ${member.user}! We hope you enjoy your stay.`);

        // ID of the role to be assigned to the new member
        const roleId = "1166130522519519304"; // Replace with the ID of the role you want to assign

        // Find the role by its ID
        const role = member.guild.roles.cache.get(roleId);

        // Check if the role was found
        if (role) {
            // Assign the role to the new member
            await member.roles.add(role);
            console.log(`Assigned the role ${role.name} to ${member.user.tag}`);
        } else {
            console.error(`Could not find the role with ID: ${roleId}`);
        }
    } else {
        console.error(`Could not find the welcome channel with ID: ${welcomeChannelId}`);
    }
});

client.on("boost", (boostedGuild) => {
    // ID del canal donde se enviará el mensaje de agradecimiento por el boost
    const thankYouChannelId = "1198761026003419236"; // Reemplaza con el ID de tu canal de agradecimiento

    // Encuentra el canal por su ID
    const thankYouChannel = boostedGuild.channels.cache.get(thankYouChannelId);

    // Comprueba si se encontró el canal
    if (thankYouChannel) {
        thankYouChannel.send(`Thanks to ${boostedGuild.members.cache.get(boostedGuild.ownerId).user.tag} for the boost! 🚀`);
    } else {
        console.error(`Could not find the thank you channel with ID: ${thankYouChannelId}`);
    }
});

client.login(config.token);
