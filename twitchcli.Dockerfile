FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y wget
WORKDIR /app
RUN wget https://github.com/twitchdev/twitch-cli/releases/download/v1.1.5/twitch-cli_1.1.5_Linux_x86_64.tar.gz
RUN tar xvzf twitch-cli_1.1.5_Linux_x86_64.tar.gz
RUN cd bin  && ln -s /app/twitch

CMD [ "twitch" ]
