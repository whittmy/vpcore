#!/usr/bin/env python

import getopt
import os
import platform
import sys
#from version import script_name, __version__
#from util import git, log
    
def mycall(url, stream_id=None):
    from .common import my_call
    #import common
    # try:
    #return common.my_call(url, stream_id)
    rt = my_call(url, stream_id)
    #print ('return:'+rt)
    return rt

"""
if __name__ == '__main__':
    print(mycall('http://v.youku.com/v_show/id_XNjkzNDc2MTQ0.html'))
    print(mycall('http://v.youku.com/v_show/id_XNjkzNDc3MDU2.html'))
    print(mycall('http://v.youku.com/v_show/id_XNjkzNDc4MjM2.html'))
"""
