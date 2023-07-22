#!/bin/bash

package="Runner"
action=""
environment=""
docker_file=""
env_file=""
attached_container=0
remove_volumes=0

function display_help() {
  echo "${package} Docker Compose Runner Manager."
  echo "Usage : "
  echo "  ./runner <options>"
  echo "  ./runner -a=start -e=local"
  echo "  ./runner --action=start --environment=local"
  echo ""
  echo "Options:"
  echo "-a, --action=ACTION       specify an action to use"
  echo "                            start   : Start existing containers."
  echo "                            stop    : Stops containers and removes containers, networks, volumes, and images"
  echo "                            restart : Restart container."
  echo "                            reboot  : Stop and Start container from zero including removing volumes."
  echo "-e, --environment=ENV     specify the environment variable, currently support:"
  echo "                            local : local server. use this if you running on local computer."
  echo "                            staging : staging server. use this if you running on staging computer."
  echo "-h, --help                show brief help"
  echo "--attach                  Disable detached mode."
  echo "--remove-volumes          Remove named volumes declared in the volumes section of the Compose file and anonymous volumes attached to containers."
  echo "--remove-orphans          Remove containers for services not defined in the Compose file."
  exit 0
}

function get_docker_file() {
  if [[ $1 == "local" ]]; then
    docker_file=./.docker/compose/local/docker-compose.yml
    env_file=./.docker/compose/local/.env
  else
    echo "invalid environment type or this environment isn't supported."
    exit 0
  fi
  return
}

function docker_container_handler() {
  get_docker_file "$2"

  if [[ $1 == "start" ]]; then
    # starting docker service
    echo "starting docker service on '$2' environment."
    if [[ $3 == 0 ]]; then
      docker compose --env-file="${env_file}" --file="${docker_file}" up -d --build
    else
      docker compose --env-file="${env_file}" --file="${docker_file}" up 
    fi
  elif [[ $1 == "stop" ]]; then
    # stop docker service
    echo "stopping docker service on '$2' environment."
    if [[ $4 == 1 ]]; then
      docker compose  --env-file=.env --file="${docker_file}" down -v
    else
      docker compose --env-file=.env --file="${docker_file}" down
    fi
  elif [[ $1 == "restart" ]]; then
    echo "restarting docker service"
    docker compose restart --file="${docker_file}"
  elif [[ $1 == "reboot" ]]; then
    echo "rebooting docker service"
    docker compose --file="${docker_file}" down -v
    docker compose --file="${docker_file}" up -d
  else
    echo "unknown action name."
    exit 0
  fi
  exit 0
}

while test $# -gt 0; do
  case "$1" in
  -a* | --action*)
    # shellcheck disable=SC2001
    action=$(echo $1 | sed -e 's/^[^=]*=//g')
    shift
    ;;
  -e* | --environment*)
    # shellcheck disable=SC2001
    environment=$(echo $1 | sed -e 's/^[^=]*=//g')
    shift
    ;;
  --attach)
    attached_container=1
    shift
    ;;
  --remove-volumes)
    remove_volumes=1
    shift
    ;;
  -h | --help)
    shift
    display_help
    exit 0
    ;;
  *)
    display_help
    exit 0
    ;;
  esac
done

if [[ "$action" == "" || "$environment" == "" ]]; then
  display_help
  exit
fi

docker_container_handler "${action}" "${environment}" "${attached_container}" "${remove_volumes}"

