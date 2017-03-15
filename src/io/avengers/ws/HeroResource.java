package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createHero(Hero hero){
    
    	HeroService h = new HeroService();
    	h.createHero(hero.getName());
    	
    	if(hero.getName() == null)
    	{
    		return Response.status(406).entity("\"empty comment\"").build();
    	}

    	return Response.status(201).entity("\"" + h+"\"").build();
    }
    
}
