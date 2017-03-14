package io.avengers.ws;

import java.sql.SQLException;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.avengers.dao.HeroDAO;
import io.avengers.domain.Hero;
import io.avengers.service.HeroService;
import io.robusta.business.UserBusiness;
import io.robusta.domain.User;

@Path("heroes")
@Produces(MediaType.APPLICATION_JSON)
public class HeroResource {
	
	@GET
	public Set<Hero> getAllHeroes() {
		
		HeroService hService = new HeroService();
		return hService.findAll();
		
	}
	
    @GET
    @Path("{id}")
    public Hero findHeroById(@PathParam("id") int id) throws SQLException {
    	Hero hero = new HeroService().findHeroesById("id");
        return hero;
    }
}
