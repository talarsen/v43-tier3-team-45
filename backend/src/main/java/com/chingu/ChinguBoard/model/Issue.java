package com.chingu.ChinguBoard.model;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "issues")
public class Issue {
    
    @Id
    private String id;

    private String title;

    private String description;

    private User createdBy; // not sure to store id or object

    private List<User> assignees; // not sure to store id or object

    private List<Comment> comments;

    // could potentially change all the times to instants and just convert to zonedtime when sending to client in DTO
    private Instant createdAt;

    private Instant updatedAt;

    private Instant dueAt;

    // I think enums will be converted to strings of the name
    private IssueType issueType;

    private Priority priority;

    private Status status;

    public Issue() {
        this.assignees = new ArrayList<>();
        this.comments = new ArrayList<>();
        this.createdAt = Instant.now();
        this.updatedAt = Instant.now();
    }

    public Issue(String title, String description, User createdBy, List<User> assignees, IssueType issueType, Priority priority, Status status) {
        super();
        this.title = title;
        this.description = description;
        this.createdBy = createdBy;
        this.assignees = assignees;
        this.issueType = issueType;
        this.priority = priority;
        this.status = status;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public List<User> getAssignees() {
        return this.assignees;
    }

    public void setAssignees(List<User> assignees) {
        this.assignees = assignees;
    }

    public Instant getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Instant getDueAt() {
        return this.dueAt;
    }

    public void setDueAt(Instant dueAt) {
        this.dueAt = dueAt;
    }

    public IssueType getIssueType() {
        return this.issueType;
    }

    public void setIssueType(IssueType issueType) {
        this.issueType = issueType;
    }

    public Priority getPriority() {
        return this.priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Status getStatus() {
        return this.status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Comment> getComments() {
        return this.comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

}
