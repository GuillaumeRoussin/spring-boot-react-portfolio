package com.springportfolio.core;

import com.fasterxml.jackson.datatype.hibernate6.Hibernate6Module;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EntityScan("com.springportfolio.core.entity")
public class SpringPortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringPortfolioApplication.class, args);
    }

    @Bean
    public Hibernate6Module datatypeHibernateModule() {
        return new Hibernate6Module();
    }
}
