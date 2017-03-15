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

import io.avengers.domain.Movie;
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
    	
    	mService.createMovie(movie.getName());
		return Response.status(201).entity("\""+movie+"\"").build();
		
    }
}
