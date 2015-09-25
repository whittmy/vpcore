#!/usr/bin/env python

import getopt
import os
import platform
import sys
#from version import script_name, __version__
#from util import git, log

def mycall(url, stream_id=None):
    from .common import my_call
    rt = my_call(url, stream_id)
    return rt
    
def test():
    print('pp test')
    return ''