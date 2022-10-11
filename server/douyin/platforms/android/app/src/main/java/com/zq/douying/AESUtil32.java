package com.zq.douying;


import java.nio.charset.Charset;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import android.util.Base64;


public class AESUtil32 {

    // AES secretKey length (must be 32 bytes)
    public static final String secretKey = "82758dd12749c777ef579f1839ceea6a";
    // 字符串编码
    private static final String KEY_CHARSET = "ISO8859-1";
    // 算法方式
    private static final String KEY_ALGORITHM = "AES";
    // 算法/模式/填充
    private static final String CIPHER_ALGORITHM_ECB = "AES/ECB/PKCS5Padding";

    // 私钥大小128/192/256(bits)位 即：16/24/32bytes，暂时使用256，如果扩大需要更换java/jre里面的jar包
    private static final Integer PRIVATE_KEY_SIZE_BIT = 256;
    private static final Integer PRIVATE_KEY_SIZE_BYTE = 32;
// 偏移量,可自行修改

    private static final String VI = "zGrVju3LPhyhiJR8";


    public static String encrypt(String plainText) {
        return encrypt(secretKey, plainText);
    }


    public static String encrypt(String secretKey, String plainText) {
        if (secretKey.length() != PRIVATE_KEY_SIZE_BYTE) {
            throw new RuntimeException("AESUtil:Invalid AES secretKey length (must be 16 bytes)");
        }
        // 密文字符串
        String cipherText = "";
        try {
            // 加密模式初始化参数
            Cipher cipher = initParam(secretKey, Cipher.ENCRYPT_MODE);
            // 获取加密内容的字节数组
            byte[] bytePlainText = plainText.getBytes(KEY_CHARSET);
            // 执行加密
//            byte[] byteCipherText = cipher.doFinal(bytePlainText);
            byte[] byteCipherText = cipher.doFinal(bytePlainText);
            cipherText = new String(byteCipherText, Charset.forName(KEY_CHARSET));
//            cipherText = Base64.encodeBase64String(byteCipherText);
        } catch (Exception e) {
            throw new RuntimeException("AESUtil:encrypt fail!", e);
        }
        return cipherText;

    }

    public static String decrypt(String cipherText) {
        return decrypt(secretKey, cipherText);
    }

    public static String decrypt(String secretKey, String cipherText) {
        if (secretKey.length() != PRIVATE_KEY_SIZE_BYTE) {
            throw new RuntimeException("AESUtil:Invalid AES secretKey length (must be 16 bytes)");
        }
        // 明文字符串
        String plainText = "";
        try {
            Cipher cipher = initParam(secretKey, Cipher.DECRYPT_MODE);
            // 将加密并编码后的内容解码成字节数组
            byte[] byteCipherText = Base64.decode(cipherText.getBytes(),Base64.DEFAULT);
//            // 解密
            byte[] bytePlainText = cipher.doFinal(byteCipherText);
            plainText = new String(bytePlainText, KEY_CHARSET);
        } catch (Exception e) {
            throw new RuntimeException("AESUtil:decrypt fail!", e);
        }
        return plainText;
    }

    public static Cipher initParam(String secretKey, int mode) {
        try {

            // 获得原始对称密钥的字节数组
            byte[] raw = secretKey.getBytes(Charset.forName(KEY_CHARSET));
            // 根据字节数组生成AES内部密钥
            SecretKeySpec key = new SecretKeySpec(raw, KEY_ALGORITHM);
            // 根据指定算法"AES/CBC/PKCS5Padding"实例化密码器
            Cipher cipher = Cipher.getInstance(CIPHER_ALGORITHM_ECB);
            // 初始化AES密码器
            cipher.init(mode, key);
            return cipher;
        } catch (Exception e) {
            throw new RuntimeException("AESUtil:initParam fail!", e);
        }
    }
}
