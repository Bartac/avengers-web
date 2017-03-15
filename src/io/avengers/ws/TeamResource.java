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

import io.avengers.domain.Team;
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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createTeam(Team team){
    
    	System.out.println(team);
    	TeamService t = new TeamService();
    	t.createTeam(team.getTeam_name());
    	
    	if(team.getTeam_name() == null)
    	{
    		return Response.status(406).entity("\"empty comment\"").build();
    	}

    	return Response.status(201).entity("\"" + t+"\"").build();
    }
}
