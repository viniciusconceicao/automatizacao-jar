package com.bandtec.searchdevelopers.backend.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.model.UsersDto

class FavoriteAdapter (private val context: Context, val favoriteService: MutableList<UsersDto>): RecyclerView.Adapter<FavoriteAdapter.UserViewHolder>(){

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) : FavoriteAdapter.UserViewHolder {
        val itemLista = LayoutInflater.from(context).inflate(R.layout.item_users, parent, false)
        val holder = UserViewHolder(itemLista)
        return holder
    }

    override fun onBindViewHolder(holder: FavoriteAdapter.UserViewHolder, position: Int) {
        holder.nomeF.text = favoriteService[position].nameUser
        holder.descricaoF.text = favoriteService[position].descriptionUser ?: "Sem descrição"
        holder.numEstrelasF.text = favoriteService[position].starsUser.toString()
    }

    override fun getItemCount(): Int = favoriteService.size

    inner class  UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nomeF = itemView.findViewById<TextView>(R.id.name_user_favorite)
        val descricaoF = itemView.findViewById<TextView>(R.id.desc_user_favorite)
        val numEstrelasF  = itemView.findViewById<TextView>(R.id.rate_user_favorite)
    }
}