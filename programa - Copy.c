int main(void) {
	int var = 100;
	char* nombre = "Tobias Briones";
	
	printf("Hola mundo! \n");
	printf("Variable: %d \n", var);
	printf("Nombre: %s \n", nombre);
	
	int fd;
	char buffer[12];
	ssize_t nr;
	
	fd = open("/home/ubuntu/Desktop/programa", O_RDONLY);
	
	if (fd == -1) {
		printf("Error! \n");
	}
	else {
		printf("Correcto! \n");
		nr = read(fd, buffer, 14);
		
		if(nr == 0) {
			printf("Archivo vacio! \n");
		}
		else {
			printf("Contenido: %s \n", buffer);
		}
		close(fd);
	}
}