use serenity::builder::CreateApplicationCommand;
use serenity::model::prelude::command::CommandOptionType;
use serenity::model::prelude::interaction::application_command::{
    CommandDataOption, CommandDataOptionValue,
};

pub fn run(options: &[CommandDataOption]) -> String {
    if let Some(CommandDataOptionValue::User(user, _member)) =
        options.get(0).and_then(|opt| opt.resolved.as_ref())
    {
        format!("<@{}>\n{CODE_FMT_MSG}", user.id)
    } else {
        CODE_FMT_MSG.to_string()
    }
}

pub fn register(command: &mut CreateApplicationCommand) -> &mut CreateApplicationCommand {
    command
        .name("codefmt")
        .description("Display a message showing how to share code samples")
        .create_option(|option| {
            option
                .name("user")
                .description("The user to ping with the message")
                .kind(CommandOptionType::User)
                .required(false)
        })
}

const CODE_FMT_MSG: &str = r#"
Please post your code examples and compiler output with code fences (\`\`\`) around them. Example:
\`\`\`rust
let (x, y) = (0, 42);
println!("Position at {}, {}", x, y);
\`\`\`

```rust
let (x, y) = (0, 42);
println!("Position at {}, {}", x, y);
```

If the snippet is long, consider sharing it through something like <https://pastebin.com/>.
Please avoid sharing screenshots of your code, as they're not very accessible. Using code fences or a shared snippet makes the code more readable and allows those helping you to copy-paste the code to help explain things.
"#;
