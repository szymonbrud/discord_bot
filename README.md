# 🤖 Multifunctional Discord Bot

This project is a custom-built Discord bot designed to provide various utility, entertainment, and moderation features to a server.

## ✨ Key Features

*   **Music Playback:** Join voice channels and play music from YouTube.
    *   Commands include `play`, `mata` (plays from a predefined list), and `/pmata`.
*   **"Barka" Action:** A special command (`barka`) to move all users to a temporary channel, play a specific song, then move them back and clean up the channel.
*   **User "Wake-Up":** Playfully moves a specified user to another channel and back (`obudz` command).
*   **Voice Channel Management:** Change the names of specific voice channels (`live` command).
*   **Entry Blocking:** Allows privileged users to block specific members from joining voice channels (the bot will kick them).
    *   Commands: `-nie_wbija` (add to blocked list), `-wbija` (remove from blocked list).
*   **Image Reactions:** Respond with specific images for commands like `Udyr`/`udyr` and `Hermanos`/`hermanos`.
*   **Command Cleanup:** Automatically deletes many used commands from the chat for tidiness.

## 🛠️ Technologies Used

*   **Node.js:** The runtime environment.
*   **Discord.js:** The library for interacting with the Discord API.
*   *(Likely other libraries for music playback, e.g., `@discordjs/voice`, `ytdl-core`, etc. - you could list them here if you want more detail, but keeping it short as requested)*
