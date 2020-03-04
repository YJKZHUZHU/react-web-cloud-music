#!/usr/bin/env node

/**
 * 此脚本用于打包页面并部署到主机。注意：此脚本需要在项目根目录下使用
 *
 * 使用方法：node bin/deploy.js -h <主机 ip> -p <主机 root 密码>
 * Options:
 *   -h: 主机 ip，不指定则使用默认密码 192.168.1.188
 *   -p: 主机 root 密码，不指定则使用主机默认密码
 *
 * 例如：node bin/deploy.js -h 192.168.1.240 -p s1234
 */

const argv = require('yargs').argv;
const SSH = require('simple-ssh');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const scpClient = require('scp2');

const USER = 'root'; // 用户名
const ARCHIVE_NAME = 'qqlvzz.zip'; // zip 压缩后的文件名
const REMOTE_PATH = 'C:/nginx-1.16.1/html'; // 静态资源文件目录

const host = argv.h || '106.54.31.160';// 读取主机 ip，默认是 106.54.31.160
const password = argv.p || '';// SSH 密码，不指定

async function main() {
  console.log('[1/4] 构建代码...');
  let result = await exec('umi build');
  console.log(result.stdout);
  
  console.log('[2/4] 打包静态资源，生成 zip 包...');
  result = await exec(`cd dist && zip -r ${ARCHIVE_NAME} ./*`);
  console.log(result.stdout);
  
  console.log('[3/4] 上传 zip 包到主机...');
  await scp();
  
  console.log('[4/4] 开始远程解压...');
  await execRemoteOperations();
}

function scp() {
  return new Promise((resolve, reject) => {
    scpClient.scp(`dist/${ARCHIVE_NAME}`, {
      host,
      username: USER,
      password: password,
      path: REMOTE_PATH,
    }, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

function execRemoteOperations() {
  return new Promise((resolve, reject) => {
    const ssh = new SSH({
      host,
      user: USER,
      pass: password,
    });
    
    ssh
      .exec(`unzip -o -d ${REMOTE_PATH} ${REMOTE_PATH}/${ARCHIVE_NAME}`, {
        out: (stdout) => console.log(stdout),
      })
      .exec(`rm ${REMOTE_PATH}/${ARCHIVE_NAME}`, {
        out: (stdout) => console.log(stdout),
        exit: () => {
          resolve();
        },
      })
      .on('error', function(err) {
        ssh.end();
        reject(err);
      })
      .start();
  });
}

main()
  .then(() => console.log('[Finished] 成功部署页面'))
  .catch(err => {
    console.error('部署页面出错：');
    console.error(err);
  });
