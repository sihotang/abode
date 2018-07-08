export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

SSH_ENV=$HOME/.ssh/environment

# Start SSH-Agent
if [ -f "${SSH_ENV}" ]; then
     . ${SSH_ENV} > /dev/null
     ps -ef | grep ${SSH_AGENT_PID} | grep ssh-agent$ > /dev/null || {
        start-agent;
    }
else
    start-agent;
fi
