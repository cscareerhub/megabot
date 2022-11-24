print-bot-version:
  @cargo pkgid --package megabot | awk -F '#' '{print $2}'
  
deploy:
  cargo build --release
  sudo mv /usr/local/bin/megabot /usr/local/bin/megabot.bak
  sudo cp target/release/megabot /usr/local/bin/megabot
  sudo systemctl restart megabot

rollback:
  sudo mv /usr/local/bin/megabot /usr/local/bin/megabot.tmp
  sudo mv /usr/local/bin/megabot.bak /usr/local/bin/megabot
  sudo rm /usr/local/bin/megabot.tmp
  sudo systemctl restart megabot

view-logs:
  sudo journalctl -u megabot -f

start:
  sudo systemctl start megabot

stop:
  sudo systemctl stop megabot

restart:
  sudo systemctl restart megabot

edit-config:
  sudo vim /etc/megabot/config.toml
