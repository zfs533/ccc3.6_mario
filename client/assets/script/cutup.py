# -*- coding: utf-8 -*
"""
    切图工具，大图切碎片
"""
import os
import sys

from PIL import Image


def startCut(imgPath, w,h, savePath):
    """
        开始切图
        imgPath:大图路径
        size:单张切片尺寸,正矩形
        savePath:保存切片路径
    """
    img = Image.open(imgPath)
    hor = img.size[0]/w
    ver = img.size[1]/h
    print("图像宽度%d 图像高低%d" % (img.size[0], img.size[1]))
    for i in range(hor):
        for j in range(ver):
            cropped = img.crop(
                ((i*w), (j*h), (i*w+w), (j*h+h)))
            # rPath = "%s/%d_%d.jpg" % (savePath, i, j)
            if i < 90:
                rPath = "%s/%d_%d.png" % (savePath, i, j)
                print(rPath)
                cropped.save(rPath)


def mkdir_recursively(path_list):
    """
        循环递归创建目录
    """
    dir = ''
    for path_item in path_list:
        dir = os.path.join(dir, path_item)
        print("dir:", dir)
        if os.path.exists(dir):
            if os.path.isdir(dir):
                print("mkdir skipped: %s, already exist." % (dir,))
            else:  # Maybe a regular file, symlink, etc.
                print("Invalid directory already exist:", dir)
                return False
        else:
            try:
                os.mkdir(dir)
            except e:
                print("mkdir error: ", dir)
                print(e)
                return False
            print("mkdir ok:", dir)


if __name__ == '__main__':
    """
        sys.argv[1]:大图路径
        sys.argv[2]:单张切片尺寸,正矩形
        sys.argv[3]:保存切片路径
    """
    imgPath = sys.argv[1]
    w = int(sys.argv[2])
    h = int(sys.argv[3])
    savePath = sys.argv[4]
    path_list = savePath.split('/')
    print(path_list)
    print("-----------------")
    print(sys.argv);
    print("-----------------")
    mkdir_recursively(path_list)
    startCut(imgPath, w,h, savePath)

"""
exp:
    python cutup.py map.jpg 100 save/one/two/three
    python cutup.py map.png 16 save
    python cutup.py role.png 447 68 save
    python cutup.py enemy.png 16 16 save1
    python cutup.py enemy.png 96 128 save1
    python cutup.py ./e/3_0.png 16 35 save1
    
    图像宽度447 图像高低687
"""
