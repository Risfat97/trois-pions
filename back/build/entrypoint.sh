#!/bin/bash
php /var/www/trois-pions-back/public/create-chat.php &
exec apache2-foreground
