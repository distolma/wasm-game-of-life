FROM rust:slim
WORKDIR /usr/src

# curl
RUN apt-get -yqq update; \
    apt-get -yqq install curl

RUN rustup target add wasm32-unknown-unknown
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# nodejs
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -; \
    apt-get install -yqq nodejs

EXPOSE 8080
