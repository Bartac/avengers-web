package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

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
    @Produces(MediaType.APPLICATION_JSON)
    public Movie findMovieById(@PathParam("id") String id) {
		MovieService mService = new MovieService();
        return mService.findMoviesById(id);
    }
}
