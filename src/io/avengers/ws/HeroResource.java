package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.avengers.domain.Hero;
import io.avengers.domain.Movie;
import io.avengers.service.HeroService;
import io.avengers.service.MovieService;

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
    /*
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createHero(Hero hero){
    
    	HeroService h = new HeroService();
    	
    	if(hero.getName().isEmpty())
    	{
    		return Response.status(406).entity("\"empty comment\"").build();
    	}

    	h.createHero(hero.getName(),hero.getReal_name());
    	h.addHeroToTeam(hero.getTeam_name(), hero.getName());
    	return Response.status(201).entity("\"" + h+"\"").build();
    }
        @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addHeroToTeam(Hero hero){
    	
    	HeroService h = new HeroService();
    	System.out.println(hero.getTeam_name());
    	h.addHeroToTeam(hero.getTeam_name(),hero.getName());
    	return Response.status(201).entity("\"" + h+"\"").build();
    }*/
    
    @DELETE
	@Path("{id}")
	public Response deleteHero(@PathParam("id") String id){
		HeroService hService = new HeroService();
    	Hero hero = hService.findHeroesById(id);
    	System.out.println(hero);

		if (hero == null){
			throw new NotFoundException("Can't find this number "+ id);
		}
		new HeroService().deleteHero(hero.getId());
		return Response.noContent().header("X--message", "Deleted " +hero.getName()+" "+hero.getReal_name()).build();
	}
    
    @POST
    @Path("addmovie")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addHeroToMovie(Hero hero){
    	
    	MovieService mService = new MovieService();
    	HeroService hService = new HeroService();
    	String s = hero.getMovies_name().get(0);
    	Movie m = (mService.findMoviesByName(s)).iterator().next();
    	int id_movie = m.getId();
    	
    	Hero h = hService.findHeroesByName(hero.getName()).iterator().next();
    	int id_hero = h.getId();
    	
    	if(hero.getName().isEmpty())
    	{
    		return Response.status(406).entity("\"empty comment\"").build();
    	}

    	hService.addHeroToMovie(id_movie,id_hero);
    	return Response.status(201).entity("\"" + h+"\"").build();
    }
        

	
}
