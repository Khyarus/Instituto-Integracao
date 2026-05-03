#!/bin/bash

# ==============================================================================
# Script: start_project.sh
# Objetivo: Iniciar os servidores Backend e Frontend do TaskHub simultaneamente.
# ==============================================================================

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}>>> Iniciando o projeto TaskHub...${NC}"

# 1. Iniciar o Backend
echo -e "${BLUE}>>> Iniciando o Backend na porta 8081...${NC}"
cd backend
mvn spring-boot:run &
BACKEND_PID=$!

# 2. Iniciar o Frontend
echo -e "${BLUE}>>> Iniciando o Frontend na porta 3000...${NC}"
cd ..
npm run dev &
FRONTEND_PID=$!

echo -e "${GREEN}>>> Sucesso! Servidores em execução.${NC}"
echo -e "${GREEN}>>> Backend: http://localhost:8081${NC}"
echo -e "${GREEN}>>> Frontend: http://localhost:3000${NC}"
echo -e "${BLUE}>>> Pressione [CTRL+C] para encerrar ambos os processos.${NC}"

# Captura o sinal de interrupção para fechar ambos os processos
trap "echo -e '\n${BLUE}>>> Encerrando servidores...${NC}'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

# Mantém o script rodando
wait
