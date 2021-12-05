package com.bandtec.searchdevelopers.backend.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.model.UsersDto

class UserCardAdapter(private val context: Context, val usersServices: MutableList<UsersDto>): RecyclerView.Adapter<UserCardAdapter.UserViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): UserViewHolder {
        val itemLista = LayoutInflater.from(context).inflate(R.layout.item_users, parent, false)
        val holder = UserViewHolder(itemLista)
        return holder
    }

    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        holder.nome.text = usersServices[position].nameUser
        holder.descricao.text = usersServices[position].descriptionUser ?: "Sem descrição"
        holder.email.text = usersServices[position].email
        holder.location.text = usersServices[position].locality ?: "Presencial"
        holder.title.text = usersServices[position].nameCompany ?: "Desenvolvimento"
        holder.subTitle.text = usersServices[position].nameCompany ?: "Kotlin"
        holder.idUser.text = usersServices[position].idUser.toString()
    }

    override fun getItemCount(): Int = usersServices.size

    inner class  UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nome = itemView.findViewById<TextView>(R.id.name_user)
        val descricao = itemView.findViewById<TextView>(R.id.desc_cliente_card)
        val email = itemView.findViewById<TextView>(R.id.email_user)
        val location = itemView.findViewById<TextView>(R.id.location)
        val title = itemView.findViewById<TextView>(R.id.title_card)
        val subTitle = itemView.findViewById<TextView>(R.id.sub_title)
        val idUser = itemView.findViewById<TextView>(R.id.id_user)
    }

}