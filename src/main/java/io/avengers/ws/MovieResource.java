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

@Path("movies")
@Produces(MediaType.APPLICATION_JSON)
public class MovieResource {
	
	@GET
	public Set<Movie> getAllMovies() {
		
		MovieService mService = new MovieService();
		return mService.findAll();
	}

    @GET
    @Path("{id}")
    public Movie findMovieById(@PathParam("id") String id) {
		MovieService mService = new MovieService();
        return mService.findMoviesById(id);
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createMovie(Movie movie) throws Exception{
    	MovieService mService = new MovieService();
    	System.out.println(movie);
    	if (movie.getName().isEmpty()){
			return Response.status(406).entity("\"Name Empty\"").build();
    	}
    	
    	HeroService hService = new HeroService();
    	int movie_id = mService.createMovie(movie.getName());
    	for (int i =0;i<movie.getHeroes_name().size();i++){
    		hService.addHeroToMovie(movie_id, Integer.parseInt(movie.getHeroes_name().get(i)));
    	}
    	
    	
		return Response.status(201).entity("\""+movie+"\"").build();
		
    }
    
    @DELETE
	@Path("{id}")
	public Response deleteMovie(@PathParam("id") String id){
		MovieService mService = new MovieService();
    	Movie movie = mService.findMoviesById(id);
    	System.out.println(movie);

		if (movie == null){
			throw new NotFoundException("Can't find this number "+ id);
		}
		new MovieService().deleteMovie(movie.getId());
		return Response.noContent().header("X--message", "Deleted " +movie.getName()+" "+movie.getHeroes_name()).build();
	}
    
}
