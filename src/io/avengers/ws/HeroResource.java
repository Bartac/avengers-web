package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.avengers.domain.Hero;
import io.avengers.service.HeroService;

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
    public Hero findHeroById(@PathParam("id") String id) {
		HeroService hService = new HeroService();
        return hService.findHeroesById(id);
    }
}
