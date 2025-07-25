FROM jfrog-artifactory.steelhome.internal/docker/monaco-telecom/php:8.3.20-apache

MAINTAINER it-factory <t.ndiour@ext.monaco-telecom.mc>

# git, unzip & zip are for composer
RUN apt-get update -qq && \
    apt-get install -qy \
    git \
    gnupg \
    unzip \
    zip \
    wget \
    nano && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN docker-php-ext-install \
        pdo  \
        pdo_mysql \
        opcache

# Apache
COPY ./build/vhost.conf /etc/apache2/sites-available/000-default.conf

# CMD sed -i "s/80/8080/g" /etc/apache2/ports.conf
COPY ./build/ports.conf /etc/apache2/ports.conf

# App
COPY ./ /var/www/trois-pions-back

RUN chown -R www-data:www-data /var/www/trois-pions-back

# Customising a little bit
COPY ./build/.bash_aliases /etc/.bash_aliases
RUN echo "source /etc/.bash_aliases" >> /etc/bash.bashrc

# Composer install
RUN cd /var/www/trois-pions-back && composer install --no-plugins --no-scripts --no-dev

RUN a2enmod headers
#RUN a2enmod rewrite remoteip

# Apache
EXPOSE 8080
# WebSocket
EXPOSE 8081

# Add entrypoint
COPY ./build/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/trois-pions-back

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]