/**
 * Created by fc on 14-11-16.
 */
'use strict';

var mongoose = require('mongoose'),
    Register = mongoose.model('Register'),
//    async = require('async'),
    nodemailer = require('nodemailer'),
    config = require('meanio').loadConfig();


exports.register = function(req, res){

    var register = new Register(req.body.data);
    register.status = 1;

    function register_success_template(register){
        return {
            html : [
                register.name + '您好！',
                '您的实验申请已经注册成功',
                '请您等待管理员审核！'
            ].join('\n\n'),
            subject : '[清华大学心理实验注册平台]注册成功',
            to : register.email,
            from : config.emailFrom
        };

    }

    register.save(function(err){
        if(err){
            console.log(err);
            res.status(500).send({
                msg: '注册失败，请重试'
            });
        }else{
            var transport = nodemailer.createTransport(config.mailer);
            var option = register_success_template(register);
            transport.sendMail(option, function(err, response){
                if(err){
                    console.log(err);
                    res.status(500).send({
                        msg: '邮件发送失败，请重试'
                    });
                }else{
                    res.status(200).send({
                        msg: '注册成功！稍后您将收到邮件'
                    });
                }
            });
        }
    });
};

exports.findAll = function(req, res){
    Register.find({'status':1},function(err, user){
        if(err){
            res.status(500).send({
                msg: 'System err'
            });
        }else{
            res.status(200).send(user);
        }
    });
};

exports.update = function(req, res){

    function register_success_template(emails){
        return {
            html : [
                    '您好！',
                '您的实验申请已经审核通过',
                '请您在指定的时间参加实验！'
            ].join('\n\n'),
            subject : '[清华大学心理实验注册平台]审核成功',
            to: config.emailFrom,
            bcc: emails,
            from : config.emailFrom
        };

    }

    function register_failure_template(emails){
        return {
            html : [
                    '您好！',
                '您的实验申请已经审核失败',
                '请您继续关注我们的实验活动！'
            ].join('\n\n'),
            subject : '[清华大学心理实验注册平台]审核失败',
            bcc : emails,
            to: config.emailFrom,
            from : config.emailFrom
        };

    }

    Register.update({'_id': {'$in' : req.body.data.idList} }, {'$set': {'status' : req.body.data.status}}, function(err){
        if(err){
            res.status(500).send({
                msg: 'System err'
            });
        }else{
            var transport,option;
            if(req.body.data.status === 2){
                transport = nodemailer.createTransport(config.mailer);
                option = register_success_template(req.body.data.emails);
                console.log(option);
                transport.sendMail(option, function(err, response){
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            msg: '邮件发送失败，请重试'
                        });
                    }else{
                        res.status(200).send({
                            msg: '更新成功'
                        });
                    }
                });
            }else if(req.body.data.status === 3){
                transport = nodemailer.createTransport(config.mailer);
                option = register_failure_template(req.body.data.emails);
                console.log(option);
                transport.sendMail(option, function(err, response){
                    if(err){
                        console.log(err);
                        res.status(500).send({
                            msg: '邮件发送失败，请重试'
                        });
                    }else{
                        res.status(200).send({
                            msg: '更新成功'
                        });
                    }
                });
            }else{
                res.status(500).send({
                    msg: 'System err'
                });
            }
        }
    });
};

exports.export = function(req,res){
    Register.find({'status': 2},function(err, users){

    });
};