package com.bandtec.searchdevelopers.backend.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bandtec.searchdevelopers.R
import com.bandtec.searchdevelopers.backend.model.NotificationDto

class NotificationAdapter (private val context: Context, val notificationService: MutableList<NotificationDto>): RecyclerView.Adapter<NotificationAdapter.UserViewHolder>() {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int) : NotificationAdapter.UserViewHolder {
        val itemLista = LayoutInflater.from(context).inflate(R.layout.item_users, parent, false)
        val holder = UserViewHolder(itemLista)
        return holder
    }

    override fun onBindViewHolder(holder: NotificationAdapter.UserViewHolder, position: Int) {
        holder.nomeN.text = notificationService[position].usersSender?.nameUser ?: "Sem nome"
        holder.descricaoN.text = notificationService[position].title
        holder.dataN.text = notificationService[position].dateCreated.toString()
        holder.nomeImagemN.text = notificationService[position].usersSender?.photo ?: "Sem imagem"
    }

    override fun getItemCount(): Int = notificationService.size

    inner class  UserViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val nomeN = itemView.findViewById<TextView>(R.id.name_user_notification)
        val descricaoN = itemView.findViewById<TextView>(R.id.desc_user_notification)
        val dataN = itemView.findViewById<TextView>(R.id.desc_date_notification)
        val nomeImagemN = itemView.findViewById<TextView>(R.id.name_img)

        // Ver como pegar a imagem
    }
}