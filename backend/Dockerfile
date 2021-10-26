FROM openjdk:11-slim

WORKDIR /app

ADD ./ecsite/.mvn/wrapper /app/.mvn/wrapper
ADD ./ecsite/mvnw /app
ADD ./ecsite/pom.xml /app
ADD ./ecsite/src/main/java/com/yanap/ecsite/EcsiteApplication.java /app/src/main/java/com/yanap/ecsite/EcsiteApplication.java

RUN chmod +x /app/mvnw
RUN ./mvnw install

ADD ./ecsite /app

EXPOSE 3001
CMD ["./mvnw", "spring-boot:run"]
