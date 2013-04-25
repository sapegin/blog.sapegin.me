from __future__ import with_statement
from fabric.api import *
from fabric.contrib.files import exists


env.use_ssh_config = True
env.hosts = ['seal']
REPO = 'git@github.com:sapegin/blog.sapegin.me.git'
DEST = 'sites/blog.sapegin.me'


@task(default=True)
def deploy():
	if exists(DEST):
		with cd(DEST):
			run('git checkout master')
			run('git pull')
			run('grunt deploy')
			run('docpad generate --env en,ru')
	else:
		fail('%s not found' % DEST)


@task
def upgrade():
	with cd(DEST):
		run('git checkout master')
		run('git pull')
		run('npm update -g grunt-cli')
		run('npm update -g docpad')
		run('npm install')
