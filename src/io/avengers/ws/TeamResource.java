package io.avengers.ws;

import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.avengers.domain.Hero;
import io.avengers.domain.Team;
import io.avengers.service.HeroService;
import io.avengers.service.TeamService;

@Path("teams")
@Produces(MediaType.APPLICATION_JSON)
public class TeamResource {

	@GET
	public Set<Team> getAllTeam() {
		TeamService tService = new TeamService();
		return tService.findAll();
	}
	
	
    @GET
    @Path("{id}")
    public Team findTeamById(@PathParam("id") String id) {
		TeamService tService = new TeamService();
        return tService.findTeamById(id);
    }
}
