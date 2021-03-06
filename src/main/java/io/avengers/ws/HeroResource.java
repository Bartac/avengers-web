package io.avengers.ws;

import java.util.Iterator;
import java.util.Set;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.avengers.domain.Hero;
import io.avengers.domain.Movie;
import io.avengers.domain.Team;
import io.avengers.service.HeroService;
import io.avengers.service.MovieService;
import io.avengers.service.TeamService;

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
    
    	HeroService hService = new HeroService();
		Set<Hero> h = hService.findHeroesByName(hero.getName());
		Iterator<Hero>itHero =h.iterator();

		if(itHero.hasNext()){
			Hero h2 = itHero.next();
			if(h2.getName().equals(hero.getName()))
			{
				return Response.status(406).entity("\"name already existing\"").build();
			}
		}
		
		TeamService tService = new TeamService();
		Set<Team> t = tService.findTeamByName(hero.getTeam_name());
		Iterator<Team> itTeam = t.iterator();
		
		if(itTeam.hasNext() ){
			Team t2 = itTeam.next();
			if(!t2.getTeam_name().equals(hero.getTeam_name())){
				tService.createTeam(hero.getTeam_name());
			}
		}
		if(!itTeam.hasNext()){
			tService.createTeam(hero.getTeam_name());
		}

    	if(hero.getName().isEmpty())
    	{
    		return Response.status(406).entity("\"empty comment\"").build();
    	}

    	hero.setId(hService.createHero(hero.getName(),hero.getReal_name()));
    	hService.addHeroToTeam(hero.getTeam_name(), hero.getName());
    	return Response.status(201).entity("\"" + hService+"\"").build();
    }
    
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
    
    @PUT
    @Path("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateHero(Hero hero){
    	HeroService hService = new HeroService();
    	Hero h= hService.findHeroesById(Integer.toString(hero.getId()));
    	
    	if (h == null)
    	{
    		return Response.status(406).entity("Hero id doesn't exist").build();
    	}
    	
    	if(hero.getName().isEmpty())
    	{
    		return Response.status(406).entity("\"empty comment\"").build();
    	}
    	
    	hService.updateHero(hero.getId(), hero.getName());
    	return Response.status(201).entity("\"UPDATE "+h.getName()+" to "+hero.getName()+"\"").build();
    	
    	
    }
        

	
}
