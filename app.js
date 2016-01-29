﻿#!/usr/bin/env node 


var version = "`PROJECT JABASUKURIPUTO VERSION 20160129`";

'use strict';

var Telegram = require('node-telegram-bot-api');
var config = require('./config.js');
var tg = new Telegram(config.tg_bot_api_key, { polling: true });

var tgid, tgusername;


tg.on('message', function (msg) {
    if (msg.text == "/version") {
        tg.sendMessage(msg.from.id, version, { parse_mode: 'Markdown' });
        return;
    } else if (msg.text == "SYN") {
        tg.sendMessage(msg.from.id, "`ACK`", { parse_mode: 'Markdown' });
        return; 
    }
    if (msg.from.id = config.sudo_user) {
        // ADMIN AREA
        if (msg.text.split(' ')[0] == "/replyto") {
            tg.forwardMessage(msg.text.split(' ')[1], msg.chat.id, msg.reply_to_message.id);
            return;
        }
        if (msg.reply_to_message.from.id == tgid && msg.reply_to_message.forward_from && msg.reply_to_message.forward_from != config.sudo_user) {
            tg.forwardMessage(msg.reply_to_message.forward_from, msg.chat.id, msg.id);
            return;
        }
    } else {
        if (msg.text == "/start" || msg.text == "/help") {
            tg.sendMessage(msg.from.id, "Greeting! This is a pseudo communicating tunnel to @wfjsw \n\nNo help is available. Say anything you want here.\nDO NOT USE FORWARD HERE!");
            return; 
        } 
        if (msg.forward_from.id != msg.from.id) {
            tg.sendMessage(msg.from.id, "*DO NOT USE FORWARD HERE!*", { reply_to_message_id: msg.id, parse_mode: 'Markdown' });
            return;
        }
        tg.forwardMessage(config.sudo_user, msg.chat.id, msg.id);
    }
});


tg.getMe().then(function (ret) {
    tgid = ret.result.id;
    tgusername = ret.result.username;
    console.log('PROJECT JABASUKURIPUTO INITATED');
})