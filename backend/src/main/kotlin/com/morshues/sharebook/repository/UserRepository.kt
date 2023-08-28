package com.morshues.sharebook.repository

import com.morshues.sharebook.model.User
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.ListCrudRepository
import org.springframework.data.repository.query.Param

interface UserRepository : ListCrudRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.email = :email")
    fun findByEmail(@Param("email") email: String?): User?

}